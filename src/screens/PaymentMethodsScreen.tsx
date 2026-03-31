import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Smartphone, CheckCircle, AlertCircle } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { bookingApi, scheduleApi } from '../api/booking';
import { getUser } from '../services/storage';

export default function PaymentMethodsScreen({ navigation, route }: any) {
  const { colors } = useTheme();
  const { schedule } = route.params || {};

  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'airtel' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePay = async () => {
    if (!paymentMethod) return setError('Please select a payment method.');

    const user = await getUser();
    if (!user) {
      setError('You must be logged in to book.');
      return navigation.navigate('Login');
    }

    setLoading(true);
    setError('');
    try {
      // Get seat map to find next available seat
      const seatsRes = await scheduleApi.getSeats(schedule.id);
      const availableSeat = seatsRes.data.seats.find((s: any) => s.status === 'available');
      if (!availableSeat) return setError('No seats available for this schedule.');

      // Create booking with auto-assigned seat
      const bookingRes = await bookingApi.create(schedule.id, [availableSeat.seat_number]);
      const booking = bookingRes.data[0];

      // Confirm payment
      await bookingApi.pay(booking.id, paymentMethod);

      setSuccess(`✅ Booking confirmed! Seat ${availableSeat.seat_number} via ${paymentMethod === 'momo' ? 'MTN MoMo' : 'Airtel Money'}.`);
      setTimeout(() => navigation.navigate('Home', { screen: 'MyTickets' }), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-4 pb-4" style={{ backgroundColor: colors.surface }}>
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full bg-gray-50 mr-3">
          <ChevronLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text className="text-lg font-bold" style={{ color: colors.text }}>Payment</Text>
          <Text className="text-xs" style={{ color: colors.textSecondary }}>
            {schedule?.from_city} → {schedule?.to_city} • {new Date(schedule?.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>

        {/* Trip Summary */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm" style={{ color: colors.textSecondary }}>Bus</Text>
            <Text className="text-sm font-bold" style={{ color: colors.text }}>{schedule?.bus_name} ({schedule?.plate})</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm" style={{ color: colors.textSecondary }}>Route</Text>
            <Text className="text-sm font-bold" style={{ color: colors.text }}>{schedule?.from_city} → {schedule?.to_city}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm" style={{ color: colors.textSecondary }}>Departure</Text>
            <Text className="text-sm font-bold" style={{ color: colors.text }}>
              {new Date(schedule?.departure_time).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          <View className="flex-row justify-between pt-2 border-t border-gray-200 mt-2">
            <Text className="text-sm font-bold" style={{ color: colors.textSecondary }}>Total</Text>
            <Text className="text-lg font-bold" style={{ color: colors.primary }}>
              {Number(schedule?.price).toLocaleString()} RWF
            </Text>
          </View>
        </View>

        {/* Error / Success */}
        {error ? (
          <View className="bg-red-50 border border-red-200 rounded-2xl p-3 mb-4 flex-row items-center">
            <AlertCircle size={16} color="#DC2626" />
            <Text className="text-red-600 text-sm ml-2 flex-1">{error}</Text>
          </View>
        ) : null}
        {success ? (
          <View className="bg-green-50 border border-green-200 rounded-2xl p-3 mb-4 flex-row items-center">
            <CheckCircle size={16} color="#16A34A" />
            <Text className="text-green-700 text-sm ml-2 flex-1">{success}</Text>
          </View>
        ) : null}

        {/* Payment Methods */}
        <Text className="text-base font-bold mb-3" style={{ color: colors.text }}>Select Payment Method</Text>

        {[
          { id: 'momo', label: 'MTN Mobile Money', sub: 'Pay with MTN MoMo', color: '#FFC107' },
          { id: 'airtel', label: 'Airtel Money', sub: 'Pay with Airtel Money', color: '#FF0000' },
        ].map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() => setPaymentMethod(method.id as 'momo' | 'airtel')}
            className="flex-row items-center p-4 rounded-2xl border mb-3"
            style={{
              backgroundColor: paymentMethod === method.id ? colors.primary + '10' : colors.surface,
              borderColor: paymentMethod === method.id ? colors.primary : colors.border,
            }}
          >
            <View className="w-12 h-12 rounded-full items-center justify-center mr-4" style={{ backgroundColor: method.color + '20' }}>
              <Smartphone size={22} color={method.color} />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm" style={{ color: colors.text }}>{method.label}</Text>
              <Text className="text-xs" style={{ color: colors.textSecondary }}>{method.sub}</Text>
            </View>
            {paymentMethod === method.id && <CheckCircle size={22} color={colors.primary} />}
          </TouchableOpacity>
        ))}

        {/* Pay Button */}
        <TouchableOpacity
          onPress={handlePay}
          disabled={loading}
          className="w-full py-4 rounded-[25px] items-center mt-4 mb-10"
          style={{ backgroundColor: colors.primary, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-black text-base uppercase tracking-widest">
              Pay {Number(schedule?.price).toLocaleString()} RWF
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
