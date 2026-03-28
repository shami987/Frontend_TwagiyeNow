import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors } from '../theme';

export default function BusDetailsScreen({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.white }} showsVerticalScrollIndicator={false}>
      {/* Back Button */}
      <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Bus Image Placeholder */}
      <View
        style={{
          height: 200,
          backgroundColor: colors.lightGray,
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.gray, fontSize: 14 }}>Bus Image</Text>
      </View>

      {/* Bus Name Badge */}
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 40,
            paddingVertical: 12,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>
            BUS 3
          </Text>
        </View>
      </View>

      {/* Bus Details Card */}
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 16,
          backgroundColor: colors.lightGray,
          borderRadius: 12,
          padding: 16,
        }}
      >
        {/* Date */}
        <Text style={{ color: colors.gray, fontSize: 14, marginBottom: 12 }}>
          Sat, 1st Jan, 2022
        </Text>

        {/* Bus Number */}
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.black, marginBottom: 16 }}>
          Bus no. BA123
        </Text>

        {/* Route */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <View>
            <Text style={{ color: colors.primary, fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
              Nakhipot
            </Text>
            <Text style={{ color: colors.gray, fontSize: 14 }}>06:30AM</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ color: colors.gray }}>◯-----------◯</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: colors.primary, fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
              Manbhawan
            </Text>
            <Text style={{ color: colors.gray, fontSize: 14 }}>06:50AM</Text>
          </View>
        </View>
      </View>

      {/* Available Seats */}
      <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 8 }}>
          Available Seats
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.gray, fontSize: 14 }}>12 seats available</Text>
          <Text style={{ color: colors.gray, fontSize: 14 }}>2*2 Seat Arrangement</Text>
        </View>
      </View>

      {/* Facility */}
      <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 12 }}>
          Facility
        </Text>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, color: colors.black }}>🪑 Comfort Seats</Text>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, color: colors.black }}>🕐 On Time</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, color: colors.black }}>💼 Storage Space</Text>
        </View>
      </View>

      {/* Pricing */}
      <View style={{ marginHorizontal: 16, marginBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View>
          <Text style={{ color: colors.gray, fontSize: 14, marginBottom: 4 }}>2 * 60.00</Text>
          <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>
            Rs. 120.00
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 32,
            paddingVertical: 12,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: colors.white, fontSize: 16, fontWeight: '600' }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
