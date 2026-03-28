import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, Clock, Users, Calendar, Bus as BusIcon, Navigation, Wallet } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

export default function BusSearchResultsScreen({ navigation, route }: any) {
  const { colors } = useTheme();
  const [from, setFrom] = useState(route.params?.from || 'Nyabugogo');
  const [to, setTo] = useState(route.params?.to || 'Huye');
  const [isEditing, setIsEditing] = useState(false);
  
  const [buses] = useState([
    {
      id: '1',
      name: 'BUS 3',
      busNo: 'RA 123 C',
      departTime: '06:30 AM',
      arrivalTime: '08:50 AM',
      from: 'Nyabugogo',
      to: 'Huye',
      price: '3,500',
      currency: 'RWF',
      available: true,
      distance: '127 km',
      company: 'Horizon Express',
    },
    {
      id: '2',
      name: 'BUS 5',
      busNo: 'RC 163 B',
      departTime: '07:00 AM',
      arrivalTime: '09:15 AM',
      from: 'Nyabugogo',
      to: 'Huye',
      price: '3,500',
      currency: 'RWF',
      available: true,
      distance: '127 km',
      company: 'Horizon Express',
    },
    {
      id: '3',
      name: 'BUS 9',
      busNo: 'RD 233 A',
      departTime: '07:30 AM',
      arrivalTime: '09:45 AM',
      from: 'Nyabugogo',
      to: 'Huye',
      price: '3,500',
      currency: 'RWF',
      available: false,
      distance: '127 km',
      company: 'RITCO Ltd',
    },
  ]);

  const BusCard = ({ bus }: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => bus.available && navigation.navigate('BusDetails', { bus })}
      className="mx-4 mb-4 rounded-3xl p-4 shadow-sm border"
      style={{ 
        backgroundColor: colors.surface, 
        borderColor: colors.border,
        opacity: bus.available ? 1 : 0.7
      }}
    >
      {/* Top Section: Company and Status */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-2">
            <BusIcon size={16} color={colors.primary} />
          </View>
          <View>
            <Text className="text-xs font-bold" style={{ color: colors.text }}>{bus.company}</Text>
            <Text className="text-[10px] text-gray-400 font-medium uppercase">{bus.busNo}</Text>
          </View>
        </View>
        <View className={`px-2 py-0.5 rounded-full ${bus.available ? 'bg-green-50' : 'bg-red-50'}`}>
          <Text className={`text-[9px] font-bold uppercase ${bus.available ? 'text-green-600' : 'text-red-600'}`}>
            {bus.available ? 'AVAILABLE' : 'FULL'}
          </Text>
        </View>
      </View>

      {/* Middle Section: Time and Journey */}
      <View className="flex-row items-center justify-between mb-4 px-1">
        <View className="items-center">
        <Text className="text-sm font-bold" style={{ color: colors.text }}>{bus.departTime}</Text>
        <Text className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">{from}</Text>
      </View>
      
      <View className="flex-1 items-center px-4">
        <View className="flex-row items-center w-full">
          <View className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <View className="flex-1 h-[1px] border-t border-dashed border-gray-300 mx-1" />
          <Navigation size={14} color={colors.primary} />
          <View className="flex-1 h-[1px] border-t border-dashed border-gray-300 mx-1" />
          <View className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        </View>
        <Text className="text-[9px] font-bold text-primary mt-1" style={{ color: colors.primary }}>{bus.distance}</Text>
      </View>

      <View className="items-center">
        <Text className="text-sm font-bold" style={{ color: colors.text }}>{bus.arrivalTime}</Text>
        <Text className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">{to}</Text>
      </View>
      </View>

      {/* Bottom Section: Price and Quick Info */}
      <View className="flex-row justify-between items-center pt-3 border-t border-gray-50">
        <View className="flex-row space-x-3">
          <View className="flex-row items-center">
            <Users size={12} color={colors.textSecondary} />
            <Text className="text-[10px] font-medium ml-1" style={{ color: colors.textSecondary }}>45 Seats</Text>
          </View>
          <View className="flex-row items-center">
            <Clock size={12} color={colors.textSecondary} />
            <Text className="text-[10px] font-medium ml-1" style={{ color: colors.textSecondary }}>Direct</Text>
          </View>
        </View>
        
        <View className="flex-row items-center">
          <Text className="text-xs font-bold text-gray-400 mr-1">{bus.currency}</Text>
          <Text className="text-lg font-bold" style={{ color: colors.primary }}>{bus.price}</Text>
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

          {/* Compact Route Header */}
          <View className="bg-primary p-4 rounded-3xl shadow-md" style={{ backgroundColor: colors.primary }}>
            {isEditing ? (
              <View className="space-y-3">
                <View className="flex-row items-center bg-white/20 rounded-xl px-3 py-2">
                  <MapPin size={14} color="white" />
                  <TextInput
                    value={from}
                    onChangeText={setFrom}
                    className="flex-1 ml-2 text-white font-bold text-sm p-0"
                    placeholder="From"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />
                </View>
                <View className="flex-row items-center bg-white/20 rounded-xl px-3 py-2">
                  <MapPin size={14} color="white" />
                  <TextInput
                    value={to}
                    onChangeText={setTo}
                    className="flex-1 ml-2 text-white font-bold text-sm p-0"
                    placeholder="To"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />
                </View>
                <TouchableOpacity 
                  onPress={() => setIsEditing(false)}
                  className="bg-white py-2 rounded-xl items-center"
                >
                  <Text className="text-primary font-bold text-xs" style={{ color: colors.primary }}>SAVE CHANGES</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row items-center">
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-white text-base font-bold">{from}</Text>
                    <ChevronLeft size={16} color="white" className="mx-2 rotate-180" />
                    <Text className="text-white text-base font-bold">{to}</Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Calendar size={12} color="white" />
                    <Text className="text-white/80 text-[10px] font-medium ml-1">Today, 28 March • 1 Passenger</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  onPress={() => setIsEditing(true)}
                  className="bg-white/20 p-2 rounded-xl"
                >
                  <Text className="text-white text-[10px] font-bold">CHANGE</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Bus List */}
        <ScrollView className="flex-1 pt-4" showsVerticalScrollIndicator={false}>
          <View className="px-4 mb-2">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">3 Results Found</Text>
          </View>
          {buses.map((bus) => (
            <BusCard key={bus.id} bus={bus} />
          ))}
          <View className="h-10" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}