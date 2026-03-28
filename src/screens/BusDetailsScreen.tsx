import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image, SafeAreaView } from 'react-native';
import { ChevronLeft, Clock, MapPin, Navigation, Info, ShieldCheck, Wifi, Coffee, Music, Armchair } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

export default function BusDetailsScreen({ navigation, route }: any) {
  const { colors } = useTheme();
  const { bus } = route.params || {};

  // Fallback data if params are missing
  const busData = bus || {
    name: 'BUS 3',
    busNo: 'RA 123 C',
    departTime: '06:30 AM',
    arrivalTime: '08:50 AM',
    from: 'Nyabugogo',
    to: 'Huye',
    price: '3,500',
    currency: 'RWF',
    distance: '127 km',
    company: 'Horizon Express',
  };

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
        {/* Header Image Section */}
        <View className="relative h-64 w-full">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000' }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/30" />
          
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/30"
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>

          {/* Bus Badge Overlay */}
          <View className="absolute bottom-6 left-6">
            <View className="bg-primary px-3 py-1 rounded-full self-start mb-2" style={{ backgroundColor: colors.primary }}>
              <Text className="text-white text-[10px] font-bold uppercase tracking-widest">{busData.company}</Text>
            </View>
            <Text className="text-white text-3xl font-bold">{busData.name}</Text>
            <Text className="text-white/80 text-sm font-medium">{busData.busNo} • VIP Class</Text>
          </View>
        </View>

        {/* Content Section */}
        <View className="flex-1 bg-white -mt-6 rounded-t-[40px] p-6 shadow-2xl">
          {/* Journey Summary */}
          <View className="flex-row items-center justify-between mb-8">
            <View>
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">DEPARTURE</Text>
              <Text className="text-xl font-bold" style={{ color: colors.text }}>{busData.departTime}</Text>
              <Text className="text-sm font-medium text-gray-500">{busData.from}</Text>
            </View>

            <View className="flex-1 items-center px-4">
              <View className="flex-row items-center w-full">
                <View className="w-2 h-2 rounded-full border-2 border-primary" style={{ borderColor: colors.primary }} />
                <View className="flex-1 h-[1px] border-t border-dashed border-gray-300 mx-1" />
                <Navigation size={20} color={colors.primary} />
                <View className="flex-1 h-[1px] border-t border-dashed border-gray-300 mx-1" />
                <View className="w-2 h-2 rounded-full bg-gray-300" />
              </View>
              <Text className="text-xs font-bold mt-2" style={{ color: colors.primary }}>{busData.distance}</Text>
            </View>

            <View className="items-end">
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">ARRIVAL</Text>
              <Text className="text-xl font-bold" style={{ color: colors.text }}>{busData.arrivalTime}</Text>
              <Text className="text-sm font-medium text-gray-500 text-right">{busData.to}</Text>
            </View>
          </View>

          {/* Facilities */}
          <View className="mb-8">
            <Text className="text-lg font-bold mb-4" style={{ color: colors.text }}>Premium Facilities</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              <FacilityItem icon={Wifi} label="Wifi" />
              <FacilityItem icon={Coffee} label="Snacks" />
              <FacilityItem icon={Music} label="Music" />
              <FacilityItem icon={Armchair} label="VIP Seats" />
              <FacilityItem icon={ShieldCheck} label="Secure" />
            </ScrollView>
          </View>

          {/* Info Card */}
          <View className="bg-blue-50 p-4 rounded-3xl flex-row items-start border border-blue-100 mb-8">
            <Info size={20} color={colors.primary} className="mt-0.5" />
            <View className="flex-1 ml-3">
              <Text className="text-sm font-bold text-blue-900 mb-1">Travel Advisory</Text>
              <Text className="text-xs text-blue-800 leading-4">
                Please arrive at the terminal at least 15 minutes before departure. Masks are recommended for comfort.
              </Text>
            </View>
          </View>

          {/* Booking Section */}
          <View className="flex-row items-center justify-between pt-4 border-t border-gray-100 mb-6">
            <View>
              <Text className="text-xs font-bold text-gray-400 uppercase">TOTAL PRICE</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-bold" style={{ color: colors.primary }}>{busData.price}</Text>
                <Text className="text-sm font-bold ml-1 text-gray-500">{busData.currency}</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('PaymentMethods')}
              className="bg-primary px-10 py-4 rounded-[25px] shadow-lg shadow-primary/30"
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
