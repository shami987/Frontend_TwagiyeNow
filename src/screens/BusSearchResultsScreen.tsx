import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { colors } from '../theme';

export default function BusSearchResultsScreen({ navigation }) {
  const [buses] = useState([
    {
      id: '1',
      name: 'BUS 3',
      busNo: 'BA123',
      departTime: '06:30AM',
      arrivalTime: '06:50AM',
      pickupLocation: 'Nakhipot',
      dropLocation: 'Manbhawan',
      price: 60.0,
      currency: 'Rs.',
      available: true,
    },
    {
      id: '2',
      name: 'BUS 5',
      busNo: 'BA163',
      departTime: '06:40AM',
      arrivalTime: '07:00AM',
      pickupLocation: 'Nakhipot',
      dropLocation: 'Manbhawan',
      price: 60.0,
      currency: 'Rs.',
      available: false,
    },
    {
      id: '3',
      name: 'BUS 9',
      busNo: 'BA233',
      departTime: '06:45AM',
      arrivalTime: '07:05AM',
      pickupLocation: 'Nakhipot',
      dropLocation: 'Manbhawan',
      price: 60.0,
      currency: 'Rs.',
      available: true,
    },
  ]);

  const BusCard = ({ bus }) => (
    <View
      style={{
        marginHorizontal: 16,
        marginBottom: 12,
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Bus Name and Number */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.primary }}>
          {bus.name}
        </Text>
        <Text style={{ fontSize: 14, color: colors.gray }}>{bus.busNo}</Text>
      </View>

      {/* Times and Route */}
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 }}>
            {bus.departTime}
          </Text>
          <Text style={{ fontSize: 12, color: colors.gray, marginBottom: 8 }}>Pickup</Text>
          <Text style={{ fontSize: 12, color: colors.gray }}>{bus.pickupLocation}</Text>
          <Text style={{ fontSize: 12, color: colors.gray, marginTop: 8, marginBottom: 8 }}>
            ◯
          </Text>
          <Text style={{ fontSize: 12, color: colors.gray, marginBottom: 4 }}>◯</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black, marginTop: 4 }}>
            {bus.arrivalTime}
          </Text>
          <Text style={{ fontSize: 12, color: colors.gray, marginTop: 4, marginBottom: 4 }}>Drop</Text>
          <Text style={{ fontSize: 12, color: colors.gray }}>{bus.dropLocation}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={{ height: 1, backgroundColor: colors.lightGray, marginBottom: 12 }} />

      {/* Price and Book Button */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 14, color: colors.primary, fontWeight: 'bold', marginBottom: 2 }}>
            {bus.currency} {bus.price.toFixed(2)}
          </Text>
          <Text style={{ fontSize: 12, color: colors.gray }}>Amt</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: bus.available ? colors.primary : colors.gray,
            paddingHorizontal: 24,
            paddingVertical: 10,
            borderRadius: 20,
          }}
          disabled={!bus.available}
        >
          <Text style={{ color: colors.white, fontSize: 14, fontWeight: '600' }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.lightGray }} showsVerticalScrollIndicator={false}>
      {/* Safe Area Top Spacing */}
      <View style={{ height: 40 }} />

      {/* Header */}
      <View style={{ backgroundColor: colors.lightGray, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}>
        {/* Top Bar with Back and Logo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Text style={{ fontSize: 24, color: colors.primary }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.primary }}>
            TwagiyeNow
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search Filters */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 11, color: colors.gray, marginBottom: 4 }}>From</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.black }}>Nakhipot</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 11, color: colors.gray, marginBottom: 4 }}>To</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.black }}>Manbhawan</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 12, color: colors.gray }}>Sat, 1st Jan, 2022</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 12, color: colors.gray }}>2 Seats</Text>
          </View>
        </View>
      </View>

      {/* Bus List */}
      <View style={{ paddingVertical: 12 }}>
        {buses.map((bus) => (
          <BusCard key={bus.id} bus={bus} />
        ))}
      </View>
    </ScrollView>
  );
}
