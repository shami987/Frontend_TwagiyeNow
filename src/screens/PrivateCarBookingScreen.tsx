import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { ArrowLeft, Users, MapPin, Clock, CheckCircle, AlertCircle, Smartphone, Car } from 'lucide-react-native';
import { privateCarApi } from '../api/booking';
import { getUser } from '../services/storage';

const WebDateTimeInput = ({ value, onChange, type }: any) => {
  const now = new Date();
  const minDate = now.toISOString().slice(0, 16);
  if (Platform.OS === 'web') {
    return (
      <input
        type={type || 'datetime-local'}
        value={value}
        min={minDate}
        onChange={(e) => onChange(e.target.value)}
        style={{ border: 'none', outline: 'none', fontSize: 13, fontWeight: 'bold', color: '#000', background: 'transparent', cursor: 'pointer', width: '100%' }}
      />
    );
  }
  return <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#000' }}>{value}</Text>;
};

const PrivateCarBookingScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Booking form
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [distanceKm, setDistanceKm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'airtel' | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    privateCarApi.getAll().then(res => setCars(res.data)).catch(() => setError('Failed to load cars.')).finally(() => setLoading(false));
  }, []);

  const totalPrice = selectedCar && distanceKm
    ? (Number(distanceKm) * Number(selectedCar.price_per_km)).toLocaleString()
    : '0';

  const handleBook = async () => {
    setError('');
    if (!pickup || !dropoff || !pickupTime || !distanceKm)
      return setError('Please fill in all fields.');
    if (!paymentMethod)
      return setError('Please select a payment method.');

    const user = await getUser();
    if (!user) {
      setError('You must be logged in.');
      return navigation.navigate('Login');
    }

    setBookingLoading(true);
    try {
      // Step 1: Book the car
      const bookRes = await privateCarApi.book({
        car_id: selectedCar.id,
        pickup_location: pickup,
        dropoff_location: dropoff,
        pickup_time: new Date(pickupTime).toISOString(),
        distance_km: Number(distanceKm),
      });

      // Step 2: Pay
      await privateCarApi.pay(bookRes.data.id, paymentMethod);

      setSuccess(`✅ Car booked! ${selectedCar.driver_name} will pick you up at ${pickup}.`);
      setTimeout(() => {
        setShowBookingModal(false);
        setSuccess('');
        navigation.navigate('Home', { screen: 'MyTickets' });
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Booking failed. Try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center border-b" style={{ backgroundColor: colors.surface, borderBottomColor: colors.border }}>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold" style={{ color: colors.text }}>Book Private Car</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
          <Text className="text-lg font-bold mb-4" style={{ color: colors.text }}>Available Cars</Text>

          {cars.length === 0 ? (
            <View className="bg-gray-50 rounded-2xl p-6 items-center">
              <Text style={{ color: colors.textSecondary }}>No cars available at the moment.</Text>
            </View>
          ) : (
            cars.map((car) => (
              <TouchableOpacity
                key={car.id}
                className="mb-4 rounded-3xl p-5 shadow-sm border"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                activeOpacity={0.9}
                onPress={() => { setSelectedCar(car); setShowBookingModal(true); setError(''); setSuccess(''); }}
              >
                {/* Car header */}
                <View className="flex-row items-center mb-3">
                  <View className="w-12 h-12 rounded-2xl items-center justify-center mr-3" style={{ backgroundColor: colors.primary + '15' }}>
                    <Car size={24} color={colors.primary} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-bold" style={{ color: colors.text }}>{car.car_model}</Text>
                    <Text className="text-xs" style={{ color: colors.textSecondary }}>Driver: {car.driver_name} • {car.plate}</Text>
                  </View>
                  <View className="px-2 py-1 rounded-full" style={{ backgroundColor: colors.primary + '15' }}>
                    <Text className="text-[10px] font-bold" style={{ color: colors.primary }}>AVAILABLE</Text>
                  </View>
                </View>

                {/* Car details */}
                <View className="flex-row items-center mb-4">
                  <View className="flex-row items-center mr-4">
                    <Users size={14} color={colors.textSecondary} />
                    <Text className="ml-1 text-xs" style={{ color: colors.textSecondary }}>{car.capacity} seats</Text>
                  </View>
                </View>

                {/* Price and book */}
                <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                  <View>
                    <Text className="text-xs" style={{ color: colors.textSecondary }}>Price per km</Text>
                    <Text className="text-xl font-bold" style={{ color: colors.primary }}>
                      {Number(car.price_per_km).toLocaleString()} RWF
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="px-6 py-3 rounded-2xl"
                    style={{ backgroundColor: colors.primary }}
                    onPress={() => { setSelectedCar(car); setShowBookingModal(true); setError(''); setSuccess(''); }}
                  >
                    <Text className="text-white font-bold">Book Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
          <View className="h-10" />
        </ScrollView>
      )}

      {/* Booking Modal */}
      <Modal visible={showBookingModal} animationType="slide" transparent onRequestClose={() => setShowBookingModal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, maxHeight: '90%' }}>
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
              {/* Modal header */}
              <View className="flex-row justify-between items-center mb-6">
                <View>
                  <Text className="text-xl font-bold" style={{ color: colors.text }}>Book {selectedCar?.car_model}</Text>
                  <Text className="text-xs" style={{ color: colors.textSecondary }}>Driver: {selectedCar?.driver_name}</Text>
                </View>
                <TouchableOpacity onPress={() => setShowBookingModal(false)} className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                  <Text style={{ color: colors.text, fontWeight: 'bold' }}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Error / Success */}
              {error ? (
                <View className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex-row items-center">
                  <AlertCircle size={16} color="#DC2626" />
                  <Text className="text-red-600 text-sm ml-2 flex-1">{error}</Text>
                </View>
              ) : null}
              {success ? (
                <View className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 flex-row items-center">
                  <CheckCircle size={16} color="#16A34A" />
                  <Text className="text-green-700 text-sm ml-2 flex-1">{success}</Text>
                </View>
              ) : null}

              {/* Form fields */}
              <View className="mb-4">
                <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Pickup Location</Text>
                <View className="flex-row items-center border rounded-xl px-3 py-3" style={{ borderColor: colors.primary }}>
                  <MapPin size={16} color={colors.primary} />
                  <TextInput value={pickup} onChangeText={setPickup} placeholder="e.g. Kigali City Center" placeholderTextColor="#9CA3AF" style={{ flex: 1, marginLeft: 8, fontSize: 14, color: colors.text } as any} />
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Drop-off Location</Text>
                <View className="flex-row items-center border rounded-xl px-3 py-3" style={{ borderColor: colors.primary }}>
                  <MapPin size={16} color={colors.primary} />
                  <TextInput value={dropoff} onChangeText={setDropoff} placeholder="e.g. Kigali Airport" placeholderTextColor="#9CA3AF" style={{ flex: 1, marginLeft: 8, fontSize: 14, color: colors.text } as any} />
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Pickup Date & Time</Text>
                <View className="flex-row items-center border rounded-xl px-3 py-3" style={{ borderColor: colors.primary }}>
                  <Clock size={16} color={colors.primary} />
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <WebDateTimeInput value={pickupTime} onChange={setPickupTime} type="datetime-local" />
                  </View>
                </View>
              </View>

              <View className="mb-6">
                <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Distance (km)</Text>
                <View className="flex-row items-center border rounded-xl px-3 py-3" style={{ borderColor: colors.primary }}>
                  <TextInput
                    value={distanceKm}
                    onChangeText={setDistanceKm}
                    placeholder="e.g. 15"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    style={{ flex: 1, fontSize: 14, color: colors.text } as any}
                  />
                  <Text className="text-xs font-bold" style={{ color: colors.textSecondary }}>km</Text>
                </View>
                {distanceKm ? (
                  <Text className="text-xs mt-1" style={{ color: colors.primary }}>
                    Estimated total: {totalPrice} RWF
                  </Text>
                ) : null}
              </View>

              {/* Payment method */}
              <Text className="text-xs font-bold text-gray-400 uppercase mb-3">Payment Method</Text>
              {[
                { id: 'momo', label: 'MTN Mobile Money', color: '#FFC107' },
                { id: 'airtel', label: 'Airtel Money', color: '#FF0000' },
              ].map((method) => (
                <TouchableOpacity
                  key={method.id}
                  onPress={() => setPaymentMethod(method.id as 'momo' | 'airtel')}
                  className="flex-row items-center p-4 rounded-2xl border mb-3"
                  style={{
                    backgroundColor: paymentMethod === method.id ? colors.primary + '10' : '#F9FAFB',
                    borderColor: paymentMethod === method.id ? colors.primary : '#E5E7EB',
                  }}
                >
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: method.color + '20' }}>
                    <Smartphone size={20} color={method.color} />
                  </View>
                  <Text className="flex-1 font-bold" style={{ color: colors.text }}>{method.label}</Text>
                  {paymentMethod === method.id && <CheckCircle size={20} color={colors.primary} />}
                </TouchableOpacity>
              ))}

              {/* Pay button */}
              <TouchableOpacity
                onPress={handleBook}
                disabled={bookingLoading}
                className="w-full py-4 rounded-[25px] items-center mt-2"
                style={{ backgroundColor: colors.primary, opacity: bookingLoading ? 0.7 : 1 }}
              >
                {bookingLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-black text-base uppercase tracking-widest">
                    {distanceKm ? `Pay ${totalPrice} RWF` : 'Confirm Booking'}
                  </Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PrivateCarBookingScreen;
