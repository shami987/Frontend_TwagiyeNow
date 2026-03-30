import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, MapPin, Users, Calendar, Clock, Bot, Sparkles, Car, Map as MapIcon, Navigation, Wallet, ChevronRight, ArrowUpDown, X, Search } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { Modal, Pressable } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [from, setFrom] = useState('Nyabugogo, Kigali');
  const [to, setTo] = useState('Musanze City');
  const [passengers, setPassengers] = useState('1 Person');
  const [date, setDate] = useState('March 29, 2026');
  const [time, setTime] = useState('07:00 AM');
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);

  const handleSwapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <SafeAreaView className="flex-1 pt-20" style={{ backgroundColor: colors.background }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pb-6 flex-row justify-between items-center" style={{ backgroundColor: colors.surface }}>
          <Text className="text-3xl font-bold" style={{ color: colors.primary }}>
            TwagiyeNow
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Bell size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Compact Quick Actions */}
        <View className="flex-row px-4 mt-6 space-x-3">
          {/* AI Banner */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('AIAssistant')}
            className="flex-1 rounded-3xl p-4 overflow-hidden shadow-sm"
            style={{ backgroundColor: colors.primary + '10', borderBottomWidth: 3, borderBottomColor: colors.primary }}
          >
            <View className="bg-primary/10 absolute -right-4 -top-4 w-20 h-20 rounded-full" style={{ backgroundColor: colors.primary + '10' }} />
            <View className="flex-row items-center mb-1">
              <Bot size={18} color={colors.primary} />
              <View className="ml-2 bg-primary/20 px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.primary + '20' }}>
                <Text className="text-[8px] font-black uppercase tracking-widest" style={{ color: colors.primary }}>SMART</Text>
              </View>
            </View>
            <Text className="text-sm font-black" style={{ color: colors.text }}>AI Trip Plan</Text>
            <Text className="text-[10px] font-medium text-gray-500">Ask Assistant</Text>
          </TouchableOpacity>

          {/* Private Car Banner */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('PrivateCarBooking')}
            className="flex-1 rounded-3xl p-4 overflow-hidden shadow-sm"
            style={{ backgroundColor: colors.primary + '10', borderBottomWidth: 3, borderBottomColor: colors.primary }}
          >
            <View className="bg-primary/10 absolute -right-4 -top-4 w-20 h-20 rounded-full" style={{ backgroundColor: colors.primary + '10' }} />
            <View className="flex-row items-center mb-1">
              <Car size={18} color={colors.primary} />
              <View className="ml-2 bg-primary/20 px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.primary + '20' }}>
                <Text className="text-[8px] font-black uppercase tracking-widest" style={{ color: colors.primary }}>PREMIUM</Text>
              </View>
            </View>
            <Text className="text-sm font-black" style={{ color: colors.text }}>Private Car</Text>
            <Text className="text-[10px] font-medium text-gray-500">Book Ride</Text>
          </TouchableOpacity>
        </View>

        {/* Bus Park Prompt */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('BusParkFeature')}
          className="mx-4 mt-6 rounded-2xl p-4 flex-row items-center shadow-sm"
          style={{ backgroundColor: colors.primary, elevation: 3 }}
        >
          <View className="bg-white/20 p-3 rounded-xl mr-4">
            <MapIcon size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">Are you in bus park?</Text>
            <Text className="text-white/80 text-xs">Find your bus instantly based on your location</Text>
          </View>
          <View className="bg-white/20 px-3 py-1 rounded-full">
            <Text className="text-white font-bold text-[10px]">TAP HERE</Text>
          </View>
        </TouchableOpacity>

        {/* Greeting */}
        <View className="px-4 mt-5 mb-2 flex-row justify-between items-end">
          <View>
            <Text className="text-xl font-bold mb-0.5" style={{ color: colors.text }}>
              Hello, Simbi Bezza O.
            </Text>
            <Text className="text-sm font-medium" style={{ color: colors.textSecondary }}>
              Looking for a bus?
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Tickets')}>
            <Text className="text-xs font-bold" style={{ color: colors.primary }}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Compact Recent Ticket */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Tickets')}
          className="mx-4 mb-6 rounded-2xl p-4 flex-row items-center border border-dashed"
          style={{ backgroundColor: colors.surface, borderColor: colors.primary + '40' }}
        >
          <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: colors.primaryLight }}>
            <Navigation size={20} color={colors.primary} />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-xs font-bold" style={{ color: colors.text }}>Kigali → Musanze</Text>
              <View className="flex-row items-center">
                <Text className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mr-2">ACTIVE</Text>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('LiveTrack')}
                  className="bg-secondary px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <Text className="text-[8px] font-black text-white uppercase tracking-tighter">TRACK</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row items-center">
              <View className="flex-row items-center mr-3">
                <Navigation size={10} color={colors.textSecondary} />
                <Text className="text-[10px] ml-1 font-medium" style={{ color: colors.textSecondary }}>95 km</Text>
              </View>
              <View className="flex-row items-center">
                <Wallet size={10} color={colors.textSecondary} />
                <Text className="text-[10px] ml-1 font-medium" style={{ color: colors.textSecondary }}>3,000 RWF</Text>
              </View>
            </View>
          </View>
          <ChevronRight size={18} color={colors.border} className="ml-2" />
        </TouchableOpacity>

        {/* Compact Search Card */}
        <View
          className="mx-4 mb-4 rounded-3xl p-5 shadow-lg"
          style={{
            backgroundColor: colors.surface,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          {/* Journey Section (From -> To) */}
          <View className="flex-row items-center mb-6">
            <View className="items-center mr-4">
              <View className="w-2.5 h-2.5 rounded-full border-2 border-primary bg-white" style={{ borderColor: colors.primary }} />
              <View className="w-[1px] h-10 border-l border-dashed border-gray-300 my-1" />
              <MapPin size={18} color={colors.secondary} />
            </View>
            
            <View className="flex-1 space-y-4">
              <View>
                <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">FROM</Text>
                <TextInput
                  value={from}
                  onChangeText={setFrom}
                  className="text-base font-bold p-0"
                  style={{ color: colors.text }}
                />
              </View>
              <View className="h-[1px] w-full bg-gray-100" />
              <View>
                <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">TO</Text>
                <TextInput
                  value={to}
                  onChangeText={setTo}
                  className="text-base font-bold p-0"
                  style={{ color: colors.text }}
                />
              </View>
            </View>
          </View>

          {/* Details Row (Date, Time, Passenger) */}
          <View className="flex-row justify-between pt-4 border-t border-gray-100">
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Calendar size={12} color={colors.primary} />
                <Text className="text-[9px] font-bold text-gray-400 uppercase ml-1">DATE</Text>
              </View>
              <TextInput
                value={date}
                onChangeText={setDate}
                className="text-xs font-bold p-0"
                style={{ color: colors.text }}
              />
            </View>
            
            <View className="w-[1px] h-8 bg-gray-100 mx-3" />

            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Clock size={12} color={colors.primary} />
                <Text className="text-[9px] font-bold text-gray-400 uppercase ml-1">TIME</Text>
              </View>
              <TextInput
                value={time}
                onChangeText={setTime}
                className="text-xs font-bold p-0"
                style={{ color: colors.text }}
              />
            </View>

            <View className="w-[1px] h-8 bg-gray-100 mx-3" />

            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Users size={12} color={colors.primary} />
                <Text className="text-[9px] font-bold text-gray-400 uppercase ml-1">SEATS</Text>
              </View>
              <TextInput
                value={passengers}
                onChangeText={setPassengers}
                className="text-xs font-bold p-0"
                style={{ color: colors.text }}
              />
            </View>
          </View>
        </View>

        {/* Slim Booking Button */}
        <TouchableOpacity
          onPress={() => setIsBookingModalVisible(true)}
          className="mx-12 py-3 rounded-full items-center mb-10 shadow-sm"
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white text-xs font-black uppercase tracking-widest">CLICK HERE TO BOOK YOUR BUS</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Fantastic Booking Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBookingModalVisible}
        onRequestClose={() => setIsBookingModalVisible(false)}
      >
        <Pressable 
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setIsBookingModalVisible(false)}
        >
          <Pressable 
            className="bg-white rounded-t-[40px] p-8 shadow-2xl"
            style={{ height: height * 0.75 }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View className="flex-row justify-between items-center mb-8">
              <View>
                <Text className="text-2xl font-black" style={{ color: colors.text }}>Book Your Trip</Text>
                <Text className="text-sm font-medium text-gray-400">Select your travel details</Text>
              </View>
              <TouchableOpacity 
                onPress={() => setIsBookingModalVisible(false)}
                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              >
                <X size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Location Inputs Area */}
            <View className="relative mb-8">
              {/* Starting Point */}
              <View className="bg-gray-50 rounded-[25px] p-4 mb-4 border border-gray-100">
                <View className="flex-row items-center mb-1">
                  <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                  <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Starting From</Text>
                </View>
                <TextInput
                  value={from}
                  onChangeText={setFrom}
                  className="text-base font-bold p-0 ml-4"
                  style={{ color: colors.text }}
                  placeholder="Starting Point"
                />
              </View>

              {/* Swap Button */}
              <TouchableOpacity 
                onPress={handleSwapLocations}
                className="absolute right-8 top-[45%] z-10 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center border border-gray-100"
              >
                <ArrowUpDown size={18} color={colors.primary} />
              </TouchableOpacity>

              {/* Destination */}
              <View className="bg-gray-50 rounded-[25px] p-4 border border-gray-100">
                <View className="flex-row items-center mb-1">
                  <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                  <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Going To</Text>
                </View>
                <TextInput
                  value={to}
                  onChangeText={setTo}
                  className="text-base font-bold p-0 ml-4"
                  style={{ color: colors.text }}
                  placeholder="Destination"
                />
              </View>
            </View>

            {/* Other Details (Grid) */}
            <View className="flex-row flex-wrap justify-between mb-10">
              <View className="w-[48%] bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
                <View className="flex-row items-center mb-1">
                  <Calendar size={12} color={colors.primary} className="mr-1" />
                  <Text className="text-[9px] font-bold text-gray-400 uppercase">Travel Date</Text>
                </View>
                <TextInput
                  value={date}
                  onChangeText={setDate}
                  className="text-xs font-bold p-0"
                  style={{ color: colors.text }}
                />
              </View>
              <View className="w-[48%] bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
                <View className="flex-row items-center mb-1">
                  <Users size={12} color={colors.primary} className="mr-1" />
                  <Text className="text-[9px] font-bold text-gray-400 uppercase">Passengers</Text>
                </View>
                <TextInput
                  value={passengers}
                  onChangeText={setPassengers}
                  className="text-xs font-bold p-0"
                  style={{ color: colors.text }}
                />
              </View>
            </View>

            {/* Final Action Button */}
            <TouchableOpacity
              onPress={() => {
                setIsBookingModalVisible(false);
                navigation.navigate('BusSearchResults', { from, to });
              }}
              className="w-full py-5 rounded-[25px] flex-row items-center justify-center shadow-xl shadow-primary/30"
              style={{ backgroundColor: colors.primary }}
            >
              <Search size={20} color="white" />
              <Text className="text-white text-lg font-black uppercase tracking-widest ml-2">FIND BEST BUSES</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;