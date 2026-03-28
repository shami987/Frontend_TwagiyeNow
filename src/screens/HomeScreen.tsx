import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { colors } from '../theme';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [from, setFrom] = useState('Nakhipot');
  const [to, setTo] = useState('Manbhawan');
  const [passengers, setPassengers] = useState('2 people');
  const [date, setDate] = useState('2022/1/1');
  const [time, setTime] = useState('6.30 AM');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.white }} showsVerticalScrollIndicator={false}>
      {/* Safe Area Top Spacing */}
      <View style={{ height: 40 }} />

      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24, backgroundColor: colors.primaryLight }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.primary }}>
          TwagiyeNow
        </Text>
      </View>

      {/* Greeting */}
      <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>
          Hello, Wonjala.
        </Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.black }}>
          Looking for a bus?
        </Text>
      </View>

      {/* Bus Stop Illustration Placeholder */}
      <View
        style={{
          height: 150,
          backgroundColor: colors.lightGray,
          marginHorizontal: 16,
          marginBottom: 20,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.gray, fontSize: 12 }}>Bus Stop Illustration</Text>
      </View>

      {/* Search Card */}
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 20,
          backgroundColor: colors.white,
          borderRadius: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        {/* From */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 6 }}>● From</Text>
          <TextInput
            value={from}
            onChangeText={setFrom}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.gray,
              paddingVertical: 6,
              fontSize: 14,
              color: colors.black,
            }}
          />
        </View>

        {/* To */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 6 }}>◯ To</Text>
          <TextInput
            value={to}
            onChangeText={setTo}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.gray,
              paddingVertical: 6,
              fontSize: 14,
              color: colors.black,
            }}
          />
        </View>

        {/* Passenger */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 6 }}>👥 Passenger</Text>
          <TextInput
            value={passengers}
            onChangeText={setPassengers}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.gray,
              paddingVertical: 6,
              fontSize: 14,
              color: colors.black,
            }}
          />
        </View>

        {/* Date and Time */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 6 }}>📅 Date</Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.gray,
                paddingVertical: 6,
                fontSize: 14,
                color: colors.black,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 6 }}>🕐 Time</Text>
            <TextInput
              value={time}
              onChangeText={setTime}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.gray,
                paddingVertical: 6,
                fontSize: 14,
                color: colors.black,
              }}
            />
          </View>
        </View>
      </View>

      {/* Search Now Button */}
      <TouchableOpacity
        onPress={() => navigation?.navigate('BusSearchResults')}
        style={{
          marginHorizontal: 32,
          marginBottom: 20,
          backgroundColor: colors.primary,
          paddingVertical: 14,
          borderRadius: 30,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.white, fontSize: 16, fontWeight: '600' }}>
          Search Now
        </Text>
      </TouchableOpacity>

      {/* Bottom Navigation Placeholder */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 12,
          borderTopWidth: 1,
          borderTopColor: colors.lightGray,
        }}
      >
        <Text style={{ fontSize: 18 }}>🔍</Text>
        <Text style={{ fontSize: 18 }}>☰</Text>
        <Text style={{ fontSize: 18 }}>👤</Text>
      </View>
    </ScrollView>
  );
}
