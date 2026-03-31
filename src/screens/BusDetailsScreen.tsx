import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Navigation, Info, ShieldCheck, Wifi, Coffee, Music, Armchair } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

export default function BusDetailsScreen({ navigation, route }: any) {
  const { colors } = useTheme();
  const { schedule } = route.params || {};

  if (!schedule) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
        <Text style={{ color: colors.text }}>No bus data found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4">
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const departureTime = new Date(schedule.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const departureDate = new Date(schedule.departure_time).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const FacilityItem = ({ icon: Icon, label }: any) => (
    <View className="items-center mr-6">
      <View className="w-12 h-12 rounded-2xl bg-gray-50 items-center justify-center mb-1 border border-gray-100">
        <Icon size={20} color={colors.primary} />
      </View>
      <Text className="text-[10px] font-bold text-gray-500 uppercase">{label}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View className="relative h-64 w-full">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000' }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/30" />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/30"
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>

          {/* Bus info overlay */}
          <View className="absolute bottom-6 left-6">
            <View className="px-3 py-1 rounded-full self-start mb-2" style={{ backgroundColor: colors.primary }}>
              <Text className="text-white text-[10px] font-bold uppercase tracking-widest">{schedule.bus_name}</Text>
            </View>
            <Text className="text-white text-3xl font-bold">{schedule.from_city} → {schedule.to_city}</Text>
            <Text className="text-white/80 text-sm font-medium">{schedule.plate} • {schedule.distance_km} km</Text>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 bg-white -mt-6 rounded-t-[40px] p-6 shadow-2xl">

          {/* Journey Summary */}
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">DEPARTURE</Text>
              <Text className="text-xl font-bold" style={{ color: colors.text }}>{departureTime}</Text>
              <Text className="text-sm font-medium text-gray-500">{schedule.from_city}</Text>
              <Text className="text-xs text-gray-400">{departureDate}</Text>
            </View>

            <View className="flex-1 items-center px-4">
              <View className="flex-row items-center w-full">
                <View className="w-2 h-2 rounded-full border-2" style={{ borderColor: colors.primary }} />
                <View className="flex-1 h-[1px] border-t border-dashed border-gray-300 mx-1" />
                <Navigation size={20} color={colors.primary} />
                <View className="flex-1 h-[1px] border-t border-dashed border-gray-300 mx-1" />
                <View className="w-2 h-2 rounded-full bg-gray-300" />
              </View>
              <Text className="text-xs font-bold mt-2" style={{ color: colors.primary }}>{schedule.distance_km} km</Text>
            </View>

            <View className="items-end">
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">DESTINATION</Text>
              <Text className="text-xl font-bold" style={{ color: colors.text }}>{schedule.to_city}</Text>
              <Text className="text-sm font-medium text-gray-500">{schedule.available_seats} seats left</Text>
            </View>
          </View>

          {/* Seat & Price info */}
          <View className="flex-row bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
            <View className="flex-1 items-center border-r border-gray-200">
              <Text className="text-[10px] font-bold text-gray-400 uppercase mb-1">CAPACITY</Text>
              <Text className="text-lg font-bold" style={{ color: colors.text }}>{schedule.capacity}</Text>
            </View>
            <View className="flex-1 items-center border-r border-gray-200">
              <Text className="text-[10px] font-bold text-gray-400 uppercase mb-1">AVAILABLE</Text>
              <Text className="text-lg font-bold text-green-600">{schedule.available_seats}</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-[10px] font-bold text-gray-400 uppercase mb-1">PRICE</Text>
              <Text className="text-lg font-bold" style={{ color: colors.primary }}>{Number(schedule.price).toLocaleString()} RWF</Text>
            </View>
          </View>

          {/* Facilities */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-4" style={{ color: colors.text }}>Facilities</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FacilityItem icon={Wifi} label="Wifi" />
              <FacilityItem icon={Coffee} label="Snacks" />
              <FacilityItem icon={Music} label="Music" />
              <FacilityItem icon={Armchair} label="Seats" />
              <FacilityItem icon={ShieldCheck} label="Secure" />
            </ScrollView>
          </View>

          {/* Travel Advisory */}
          <View className="bg-blue-50 p-4 rounded-3xl flex-row items-start border border-blue-100 mb-8">
            <Info size={20} color={colors.primary} />
            <View className="flex-1 ml-3">
              <Text className="text-sm font-bold text-blue-900 mb-1">Travel Advisory</Text>
              <Text className="text-xs text-blue-800 leading-4">
                Please arrive at the terminal at least 15 minutes before departure.
              </Text>
            </View>
          </View>

          {/* Book Now */}
          <View className="flex-row items-center justify-between pt-4 border-t border-gray-100 mb-6">
            <View>
              <Text className="text-xs font-bold text-gray-400 uppercase">TOTAL PRICE</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-bold" style={{ color: colors.primary }}>
                  {Number(schedule.price).toLocaleString()}
                </Text>
                <Text className="text-sm font-bold ml-1 text-gray-500">RWF</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('PaymentMethods', { schedule })}
              className="px-10 py-4 rounded-[25px] shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-white font-bold text-lg">BOOK NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
