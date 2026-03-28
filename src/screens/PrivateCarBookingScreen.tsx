import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { ArrowLeft, Star, Users, Briefcase, ShieldCheck } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const DUMMY_CARS = [
  {
    id: '1',
    name: 'Toyota Prado TXL',
    type: 'Luxury SUV',
    price: '120,000 RWF',
    rating: 4.9,
    passengers: 7,
    luggage: 4,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop',
    driver: 'Jean Claude',
  },
  {
    id: '2',
    name: 'Mercedes-Benz E-Class',
    type: 'Executive Sedan',
    price: '150,000 RWF',
    rating: 5.0,
    passengers: 4,
    luggage: 2,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop',
    driver: 'Eric Kwizera',
  },
  {
    id: '3',
    name: 'Toyota Rav4',
    type: 'Compact SUV',
    price: '80,000 RWF',
    rating: 4.8,
    passengers: 5,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop',
    driver: 'Alex Mutara',
  },
];

const PrivateCarBookingScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center border-b" style={{ backgroundColor: colors.surface, borderBottomColor: colors.border }}>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold" style={{ color: colors.text }}>Book Private Car</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-lg font-bold mb-4 px-1" style={{ color: colors.text }}>Available Premium Rides</Text>
        
        {DUMMY_CARS.map((car) => (
          <TouchableOpacity 
            key={car.id}
            className="mb-6 rounded-3xl overflow-hidden shadow-lg"
            style={{ backgroundColor: colors.surface }}
            activeOpacity={0.9}
          >
            <Image 
              source={{ uri: car.image }} 
              className="w-full h-48"
              resizeMode="cover"
            />
            
            <View className="p-5">
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-xl font-bold" style={{ color: colors.text }}>{car.name}</Text>
                  <Text className="text-sm font-medium" style={{ color: colors.primary }}>{car.type}</Text>
                </View>
                <View className="bg-yellow-100 px-2 py-1 rounded-lg flex-row items-center">
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text className="ml-1 text-xs font-bold text-yellow-700">{car.rating}</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-4 space-x-4">
                <View className="flex-row items-center mr-4">
                  <Users size={16} color={colors.textSecondary} />
                  <Text className="ml-1.5 text-sm" style={{ color: colors.textSecondary }}>{car.passengers} Seats</Text>
                </View>
                <View className="flex-row items-center">
                  <Briefcase size={16} color={colors.textSecondary} />
                  <Text className="ml-1.5 text-sm" style={{ color: colors.textSecondary }}>{car.luggage} Bags</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-5 p-3 rounded-2xl" style={{ backgroundColor: colors.background }}>
                <ShieldCheck size={18} color="#10B981" />
                <Text className="ml-2 text-xs font-medium" style={{ color: colors.textSecondary }}>Driver: {car.driver} • Fully Insured</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-2xl font-bold" style={{ color: colors.text }}>{car.price}</Text>
                  <Text className="text-[10px] font-bold uppercase" style={{ color: colors.textSecondary }}>Per Trip (Full Day)</Text>
                </View>
                <TouchableOpacity 
                  className="px-8 py-3.5 rounded-2xl"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-white font-bold">Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivateCarBookingScreen;