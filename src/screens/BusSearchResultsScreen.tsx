import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, Clock, Users, Calendar, Bus as BusIcon, Navigation } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { scheduleApi } from '../api/booking';

const { width } = Dimensions.get('window');

// Web-compatible date input
const WebDateInput = ({ value, onChange }: any) => {
  const today = new Date().toISOString().split('T')[0];
  if (Platform.OS === 'web') {
    return (
      <input
        type="date"
        value={value}
        min={today}
        onChange={(e) => onChange(e.target.value)}
        style={{ border: 'none', outline: 'none', fontSize: 13, fontWeight: 'bold', color: 'white', background: 'transparent', cursor: 'pointer', width: '100%' }}
      />
    );
  }
  return <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>{value}</Text>;
};

// Web-compatible time input
const WebTimeInput = ({ value, onChange, selectedDate }: any) => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const minTime = selectedDate === today
    ? `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
    : '00:00';
  if (Platform.OS === 'web') {
    return (
      <input
        type="time"
        value={value}
        min={minTime}
        onChange={(e) => onChange(e.target.value)}
        style={{ border: 'none', outline: 'none', fontSize: 13, fontWeight: 'bold', color: 'white', background: 'transparent', cursor: 'pointer', width: '100%' }}
      />
    );
  }
  return <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>{value}</Text>;
};

export default function BusSearchResultsScreen({ navigation, route }: any) {
  const { colors } = useTheme();
  const [from, setFrom] = useState(route.params?.from || '');
  const [to, setTo] = useState(route.params?.to || '');
  const [date, setDate] = useState(() => {
    if (route.params?.date) return route.params.date;
    return new Date().toISOString().split('T')[0];
  });
  const [time, setTime] = useState('06:00');
  const [isEditing, setIsEditing] = useState(false);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSchedules = async () => {
    setLoading(true);
    setError('');
    try {
      let res;
      if (!from && !to) {
        res = await scheduleApi.getAll(date || undefined);
      } else {
        res = await scheduleApi.search(from, to, date);
      }
      setSchedules(res.data);
      if (res.data.length === 0) setError('No buses found for this route and date.');
    } catch (err: any) {
      setError('Failed to load schedules. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const BusCard = ({ schedule }: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('BusDetails', { schedule })}
      className="mx-4 mb-4 rounded-3xl p-4 shadow-sm border"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      {/* Top: Bus name and availability */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-2">
            <BusIcon size={16} color={colors.primary} />
          </View>
          <View>
            <Text className="text-xs font-bold" style={{ color: colors.text }}>{schedule.bus_name}</Text>
            <Text className="text-[10px] text-gray-400 font-medium uppercase">{schedule.plate}</Text>
          </View>
        </View>
        <View className={`px-2 py-0.5 rounded-full ${schedule.available_seats > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <Text className={`text-[9px] font-bold uppercase ${schedule.available_seats > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {schedule.available_seats > 0 ? 'AVAILABLE' : 'FULL'}
          </Text>
        </View>
      </View>

      {/* Middle: Route and time */}
      <View className="flex-row items-center justify-between mb-4 px-1">
        <View className="items-center">
          <Text className="text-sm font-bold" style={{ color: colors.text }}>
            {new Date(schedule.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Text className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">{schedule.from_city}</Text>
        </View>

        <View className="flex-1 items-center px-4">
          <View className="flex-row items-center w-full">
            <View className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <View className="flex-1 h-[1px] border-t border-dashed border-gray-300 mx-1" />
            <Navigation size={14} color={colors.primary} />
            <View className="flex-1 h-[1px] border-t border-dashed border-gray-300 mx-1" />
            <View className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </View>
          <Text className="text-[9px] font-bold mt-1" style={{ color: colors.primary }}>
            {schedule.distance_km} km
          </Text>
        </View>

        <View className="items-center">
          <Text className="text-sm font-bold" style={{ color: colors.text }}>{schedule.to_city}</Text>
          {schedule.expected_arrival && (
            <Text className="text-[10px] text-gray-400 font-medium mt-0.5">
              ETA {new Date(schedule.expected_arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          )}
        </View>
      </View>

      {/* Bottom: Seats and price */}
      <View className="flex-row justify-between items-center pt-3 border-t border-gray-50">
        <View className="flex-row space-x-3">
          <View className="flex-row items-center">
            <Users size={12} color={colors.textSecondary} />
            <Text className="text-[10px] font-medium ml-1" style={{ color: colors.textSecondary }}>
              {schedule.available_seats} seats left
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <Text className="text-xs font-bold text-gray-400 mr-1">RWF</Text>
          <Text className="text-lg font-bold" style={{ color: colors.primary }}>
            {Number(schedule.price).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 pt-10 pb-6 shadow-sm" style={{ backgroundColor: colors.surface }}>
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full bg-gray-50">
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <Text className="text-lg font-bold" style={{ color: colors.text }}>Available Buses</Text>
            <View className="w-10" />
          </View>

          {/* Route Header */}
          <View className="bg-primary p-4 rounded-3xl shadow-md" style={{ backgroundColor: colors.primary }}>
            {isEditing ? (
              <View className="space-y-3">
                <View className="flex-row items-center bg-white/20 rounded-xl px-3 py-2">
                  <MapPin size={14} color="white" />
                  <TextInput
                    value={from}
                    onChangeText={setFrom}
                    placeholder="From"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    style={{ flex: 1, marginLeft: 8, color: 'white', fontWeight: 'bold', fontSize: 14, padding: 0, outlineStyle: 'none' } as any}
                  />
                </View>
                <View className="flex-row items-center bg-white/20 rounded-xl px-3 py-2">
                  <MapPin size={14} color="white" />
                  <TextInput
                    value={to}
                    onChangeText={setTo}
                    placeholder="To"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    style={{ flex: 1, marginLeft: 8, color: 'white', fontWeight: 'bold', fontSize: 14, padding: 0, outlineStyle: 'none' } as any}
                  />
                </View>
                <View className="flex-row items-center bg-white/20 rounded-xl px-3 py-2">
                  <Calendar size={14} color="white" />
                  <View className="flex-1 ml-2">
                    <WebDateInput value={date} onChange={setDate} />
                  </View>
                </View>
                <View className="flex-row items-center bg-white/20 rounded-xl px-3 py-2">
                  <Clock size={14} color="white" />
                  <View className="flex-1 ml-2">
                    <WebTimeInput value={time} onChange={setTime} selectedDate={date} />
                  </View>
                </View>
                <TouchableOpacity onPress={() => { setIsEditing(false); fetchSchedules(); }} className="bg-white py-2 rounded-xl items-center">
                  <Text className="font-bold text-xs" style={{ color: colors.primary }}>SEARCH</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row items-center">
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-white text-base font-bold">{from}</Text>
                    <Text className="text-white mx-2">→</Text>
                    <Text className="text-white text-base font-bold">{to}</Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Calendar size={12} color="white" />
                    <Text className="text-white/80 text-[10px] font-medium ml-1">{date}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setIsEditing(true)} className="bg-white/20 p-2 rounded-xl">
                  <Text className="text-white text-[10px] font-bold">CHANGE</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Results */}
        <ScrollView className="flex-1 pt-4" showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} className="mt-10" />
          ) : error ? (
            <View className="mx-4 mt-6 bg-red-50 border border-red-200 rounded-2xl p-4">
              <Text className="text-red-600 text-center text-sm">{error}</Text>
            </View>
          ) : (
            <>
              <View className="px-4 mb-2">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {schedules.length} Result{schedules.length !== 1 ? 's' : ''} Found
                </Text>
              </View>
              {schedules.map((schedule) => (
                <BusCard key={schedule.id} schedule={schedule} />
              ))}
            </>
          )}
          <View className="h-10" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
