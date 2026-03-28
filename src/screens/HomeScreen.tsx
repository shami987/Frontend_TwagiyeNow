import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { Bell, MapPin, Users, Calendar, Clock, Bot, Sparkles, Car } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [from, setFrom] = useState('Nyabugogo, Kigali');
  const [to, setTo] = useState('Musanze City');
  const [passengers, setPassengers] = useState('1 Person');
  const [date, setDate] = useState('March 29, 2026');
  const [time, setTime] = useState('07:00 AM');

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-5 pb-6 flex-row justify-between items-center" style={{ backgroundColor: colors.surface }}>
          <Text className="text-3xl font-bold" style={{ color: colors.primary }}>
            TwagiyeNow
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Bell size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Action Banners */}
        <View className="flex-row px-4 mt-4 space-x-3">
          {/* AI Banner */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('AIAssistant')}
            className="flex-1 rounded-2xl p-4 overflow-hidden"
            style={{ backgroundColor: colors.primaryLight }}
          >
            <View className="bg-white/20 absolute -right-2 -top-2 w-16 h-16 rounded-full" />
            <Bot size={24} color={colors.primary} />
            <Text className="text-sm font-bold mt-2" style={{ color: colors.primary }}>AI Trip Plan</Text>
            <Text className="text-[10px] font-medium" style={{ color: colors.primary }}>Smart Assistant</Text>
          </TouchableOpacity>

          {/* Private Car Banner */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('PrivateCarBooking')}
            className="flex-1 rounded-2xl p-4 overflow-hidden"
            style={{ backgroundColor: '#E0F2FE' }}
          >
            <View className="bg-blue-400/10 absolute -right-2 -top-2 w-16 h-16 rounded-full" />
            <Car size={24} color="#0284C7" />
            <Text className="text-sm font-bold mt-2" style={{ color: '#0284C7' }}>Private Car</Text>
            <Text className="text-[10px] font-medium" style={{ color: '#0284C7' }}>Premium Ride</Text>
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <View className="px-4 my-5">
          <Text className="text-xl font-bold mb-1" style={{ color: colors.text }}>
            Hello, Wonjala.
          </Text>
          <Text className="text-base font-semibold" style={{ color: colors.textSecondary }}>
            Looking for a bus?
          </Text>
        </View>

        {/* Search Card */}
        <View
          className="mx-4 mb-5 rounded-2xl p-4 shadow-lg"
          style={{
            backgroundColor: colors.surface,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          {/* From */}
          <View className="mb-4">
            <View className="flex-row items-center mb-1.5">
              <MapPin size={16} color={colors.primary} />
              <Text className="text-sm font-semibold ml-1.5" style={{ color: colors.text }}>From</Text>
            </View>
            <TextInput
              value={from}
              onChangeText={setFrom}
              className="border-b py-1.5 text-sm"
              style={{
                borderBottomColor: colors.border,
                color: colors.text,
              }}
            />
          </View>

          {/* To */}
          <View className="mb-4">
            <View className="flex-row items-center mb-1.5">
              <MapPin size={16} color={colors.secondary} />
              <Text className="text-sm font-semibold ml-1.5" style={{ color: colors.text }}>To</Text>
            </View>
            <TextInput
              value={to}
              onChangeText={setTo}
              className="border-b py-1.5 text-sm"
              style={{
                borderBottomColor: colors.border,
                color: colors.text,
              }}
            />
          </View>

          {/* Passenger */}
          <View className="mb-4">
            <View className="flex-row items-center mb-1.5">
              <Users size={16} color={colors.primary} />
              <Text className="text-sm font-semibold ml-1.5" style={{ color: colors.text }}>Passenger</Text>
            </View>
            <TextInput
              value={passengers}
              onChangeText={setPassengers}
              className="border-b py-1.5 text-sm"
              style={{
                borderBottomColor: colors.border,
                color: colors.text,
              }}
            />
          </View>

          {/* Date and Time */}
          <View className="flex-row justify-between gap-2">
            <View className="flex-1">
              <View className="flex-row items-center mb-1.5">
                <Calendar size={16} color={colors.primary} />
                <Text className="text-sm font-semibold ml-1.5" style={{ color: colors.text }}>Date</Text>
              </View>
              <TextInput
                value={date}
                onChangeText={setDate}
                className="border-b py-1.5 text-sm"
                style={{
                  borderBottomColor: colors.border,
                  color: colors.text,
                }}
              />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center mb-1.5">
                <Clock size={16} color={colors.primary} />
                <Text className="text-sm font-semibold ml-1.5" style={{ color: colors.text }}>Time</Text>
              </View>
              <TextInput
                value={time}
                onChangeText={setTime}
                className="border-b py-1.5 text-sm"
                style={{
                  borderBottomColor: colors.border,
                  color: colors.text,
                }}
              />
            </View>
          </View>
        </View>

        {/* Search Now Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('BusSearchResults')}
          className="mx-4 py-4 rounded-[30px] items-center mb-5"
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white text-base font-bold">SEARCH NOW</Text>
        </TouchableOpacity>

        {/* Live Tracking Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('LiveTrack')}
          className="mx-4 py-4 rounded-[30px] items-center mb-10"
          style={{ backgroundColor: colors.secondary }}
        >
          <Text className="text-white text-base font-bold">LIVE TRACKING</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;