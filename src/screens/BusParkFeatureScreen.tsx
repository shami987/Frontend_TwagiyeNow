import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Navigation, Clock, CreditCard, ChevronLeft, Map as MapIcon, LocateFixed, Compass } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { WebView } from 'react-native-webview';

const BusParkFeatureScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [destination, setDestination] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [locationName, setLocationName] = useState('');
  const [routeNumber, setRouteNumber] = useState('');

  const handleTakeLocation = async () => {
    if (!destination.trim()) {
      Alert.alert('Missing Destination', 'Please enter where you want to go first.');
      return;
    }
    
    setIsLocating(true);
    
    try {
      // 1. Coordinates for Nyabugogo (Kigali)
      const lat = -1.9441;
      const lng = 30.0619;
      setCoords({ lat, lng });

      // 2. Fetch "Real Name from Map" using Nominatim (OpenStreetMap - Free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: {
            'User-Agent': 'TwagiyeNowApp/1.0'
          }
        }
      );
      
      const data = await response.json();
      
      if (data && data.address) {
        // Construct a "Real Name" based on map data
        const sector = data.address.suburb || data.address.neighbourhood || 'Nyabugogo';
        const road = data.address.road || 'KN 1 Rd';
        const city = data.address.city || 'Kigali';
        
        setLocationName(`${sector}, ${city}`);
        setRouteNumber(road);
      } else {
        // Fallback if API fails
        setLocationName('Nyabugogo Sector, Kigali');
        setRouteNumber('KN 1 Rd');
      }
    } catch (error) {
      console.error('Geocoding Error:', error);
      setLocationName('Nyabugogo, Kigali');
      setRouteNumber('KN 1 Rd');
    } finally {
      setIsLocating(false);
      setShowResults(true);
    }
  };

  const dummyBus = {
    company: 'Horizon Express',
    arrivalTime: '5 mins',
    route: `Nyabugogo → ${destination || 'Huye'}`,
    distance: '127 km',
    price: '3,500 RWF',
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="px-4 py-6 flex-row items-center pt-12" style={{ backgroundColor: colors.surface }}>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold" style={{ color: colors.text }}>
          Bus Park Assistant
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-6">
        <View className="mb-8">
          <Text className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
            Where do you want to go?
          </Text>
          <Text className="text-base mb-6" style={{ color: colors.textSecondary }}>
            Enter your destination and we'll find the next bus for you.
          </Text>

          <View 
            className="flex-row items-center px-4 py-3 rounded-xl border mb-4"
            style={{ borderColor: colors.border, backgroundColor: colors.surface }}
          >
            <MapPin size={20} color={colors.primary} />
            <TextInput
              placeholder="Example: Huye"
              placeholderTextColor={colors.textSecondary}
              value={destination}
              onChangeText={setDestination}
              className="flex-1 ml-3 text-base"
              style={{ color: colors.text }}
            />
          </View>

          <TouchableOpacity
            onPress={handleTakeLocation}
            className="flex-row items-center justify-center py-4 rounded-xl"
            style={{ backgroundColor: colors.primary }}
            disabled={isLocating}
          >
            {isLocating ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Navigation size={20} color="white" />
                <Text className="text-white font-bold text-lg ml-2">Take my location</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {showResults && (
          <View className="space-y-4 mb-10">
            {/* Location Identity Card */}
            <View 
              className="p-5 rounded-2xl border mb-2"
              style={{ backgroundColor: colors.surface, borderColor: colors.primary + '30' }}
            >
              <View className="flex-row items-center mb-4">
                <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-4">
                  <LocateFixed size={24} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: colors.primary }}>Current Location Detected</Text>
                  <Text className="text-lg font-bold" style={{ color: colors.text }}>{locationName}</Text>
                </View>
              </View>

              <View className="flex-row justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                <View>
                  <Text className="text-[10px] font-bold text-gray-400 uppercase">Route Number</Text>
                  <Text className="text-sm font-bold" style={{ color: colors.primary }}>{routeNumber}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-[10px] font-bold text-gray-400 uppercase">Coordinates</Text>
                  <Text className="text-[10px] font-medium" style={{ color: colors.textSecondary }}>{coords.lat}, {coords.lng}</Text>
                </View>
              </View>
            </View>

            {/* Map Zoom Route */}
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2 px-1">
                <Text className="text-lg font-bold" style={{ color: colors.text }}>Live Route View</Text>
                <View className="flex-row items-center">
                  <Compass size={14} color={colors.primary} />
                  <Text className="text-xs font-bold ml-1" style={{ color: colors.primary }}>ZOOMED</Text>
                </View>
              </View>
              <View 
                className="h-48 rounded-2xl overflow-hidden border relative"
                style={{ borderColor: colors.border }}
              >
                <WebView
                  style={{ flex: 1 }}
                  source={{ 
                    uri: `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${destination}&travelmode=driving`
                  }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                />
                {/* Overlay to prevent interaction if desired or for a "map feel" */}
                <View className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded shadow-sm">
                  <Text className="text-[10px] font-bold">Zooming to route...</Text>
                </View>
              </View>
            </View>

            <Text className="text-lg font-bold" style={{ color: colors.text }}>
              Route Details
            </Text>
            
            <View 
              className="p-5 rounded-2xl shadow-sm border"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <View className="flex-row justify-between mb-4">
                <View>
                  <Text className="text-sm font-medium" style={{ color: colors.textSecondary }}>Route</Text>
                  <Text className="text-lg font-bold" style={{ color: colors.text }}>{dummyBus.route}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-sm font-medium" style={{ color: colors.textSecondary }}>Distance</Text>
                  <Text className="text-lg font-bold" style={{ color: colors.primary }}>{dummyBus.distance}</Text>
                </View>
              </View>

              <View className="h-[1px] w-full mb-4" style={{ backgroundColor: colors.border }} />

              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-sm font-medium" style={{ color: colors.textSecondary }}>Price</Text>
                  <Text className="text-2xl font-bold" style={{ color: colors.text }}>{dummyBus.price}</Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-700 font-bold text-xs">Best Price</Text>
                </View>
              </View>
            </View>

            <Text className="text-lg font-bold mt-4" style={{ color: colors.text }}>
              Upcoming Buses
            </Text>

            <View 
              className="p-5 rounded-2xl border"
              style={{ backgroundColor: colors.surface, borderColor: colors.primary, borderWidth: 2 }}
            >
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                    <MapIcon size={20} color={colors.primary} />
                  </View>
                  <View>
                    <Text className="text-lg font-bold" style={{ color: colors.text }}>{dummyBus.company}</Text>
                    <Text className="text-sm" style={{ color: colors.textSecondary }}>Express Service</Text>
                  </View>
                </View>
                <View className="bg-orange-100 px-3 py-1 rounded-full flex-row items-center">
                  <Clock size={12} color="#f97316" />
                  <Text className="text-orange-700 font-bold text-xs ml-1">{dummyBus.arrivalTime}</Text>
                </View>
              </View>

              <View className="mt-4 p-3 rounded-lg bg-red-50 border border-red-100">
                <Text className="text-red-600 text-sm font-semibold text-center">
                  ⚠️ Pay before 10 min to secure your seat
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('PaymentMethods')}
                className="mt-5 flex-row items-center justify-center py-4 rounded-xl"
                style={{ backgroundColor: colors.primary }}
              >
                <CreditCard size={20} color="white" />
                <Text className="text-white font-bold text-lg ml-2">Proceed to Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusParkFeatureScreen;
