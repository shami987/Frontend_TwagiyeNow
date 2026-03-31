import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Modal, Pressable, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { History, Calendar, Clock, Ticket as TicketIcon, ChevronRight, X, Wallet, Car, MapPin, Trash2 } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { bookingApi, privateCarApi } from '../api/booking';

const { width } = Dimensions.get('window');

const TicketsScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [tickets, setTickets] = useState<any[]>([]);
  const [carBookings, setCarBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'bus' | 'car'>('bus');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchTickets = useCallback(async () => {
    try {
      const [busRes, carRes] = await Promise.all([
        bookingApi.getMyBookings(),
        privateCarApi.getMyBookings(),
      ]);
      setTickets(busRes.data);
      setCarBookings(carRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  const handleTicketPress = (ticket: any) => {
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  const handleDelete = async (id: string, type: 'bus' | 'car') => {
    try {
      if (type === 'car') {
        await privateCarApi.cancel(id);
        setCarBookings(prev => prev.filter(b => b.id !== id));
      } else {
        await bookingApi.delete(id);
        setTickets(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'confirmed') return { bg: '#E8F5E9', text: '#2E7D32' };
    if (status === 'cancelled') return { bg: '#FDECEA', text: '#C0392B' };
    return { bg: '#FFF8E1', text: '#E67E22' };
  };

  // QR code as image from free API
  const getQrUrl = (data: string) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="px-4 pt-5 pb-4 border-b" style={{ backgroundColor: colors.surface, borderBottomColor: colors.border }}>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-3xl font-bold" style={{ color: colors.text }}>My Tickets</Text>
          <TouchableOpacity onPress={() => navigation.navigate('BookingHistory')} className="p-2 rounded-full" style={{ backgroundColor: colors.primaryLight }}>
            <History size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {/* Tabs */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setTab('bus')}
            className="flex-1 py-2 rounded-full items-center"
            style={{ backgroundColor: tab === 'bus' ? colors.primary : colors.background }}>
            <Text className="text-xs font-bold" style={{ color: tab === 'bus' ? '#fff' : colors.gray }}>🚌 Bus Tickets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab('car')}
            className="flex-1 py-2 rounded-full items-center"
            style={{ backgroundColor: tab === 'car' ? colors.primary : colors.background }}>
            <Text className="text-xs font-bold" style={{ color: tab === 'car' ? '#fff' : colors.gray }}>🚗 Car Bookings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} className="mt-20" />
        ) : tab === 'bus' ? (
          // BUS TICKETS
          tickets.length === 0 ? (
            <View className="flex-1 justify-center items-center py-20">
              <TicketIcon size={40} color={colors.border} />
              <Text className="text-lg font-bold mt-4" style={{ color: colors.textSecondary }}>No bus tickets yet.</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MainHome')} className="mt-4 px-6 py-3 rounded-full" style={{ backgroundColor: colors.primary }}>
                <Text className="text-white font-bold">Book a Bus</Text>
              </TouchableOpacity>
            </View>
          ) : (
            tickets.map((ticket) => {
              const statusStyle = getStatusColor(ticket.status);
              return (
                <TouchableOpacity key={ticket.id} className="mb-6 rounded-3xl overflow-hidden shadow-lg" style={{ backgroundColor: colors.surface }} activeOpacity={0.9} onPress={() => handleTicketPress(ticket)}>
                  <View className="p-5 border-b-2 border-dashed" style={{ borderBottomColor: colors.background }}>
                    <View className="flex-row justify-between items-center mb-4">
                      <View className="flex-row items-center">
                        <View className="w-10 h-10 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: colors.primaryLight }}>
                          <TicketIcon size={20} color={colors.primary} />
                        </View>
                        <View>
                          <Text className="text-base font-bold" style={{ color: colors.text }}>{ticket.bus_name}</Text>
                          <Text className="text-xs font-medium" style={{ color: colors.textSecondary }}>{ticket.plate}</Text>
                        </View>
                      </View>
                      <View className="px-3 py-1 rounded-full" style={{ backgroundColor: statusStyle.bg }}>
                        <Text className="text-[10px] font-bold uppercase" style={{ color: statusStyle.text }}>{ticket.status}</Text>
                      </View>
                    </View>
                    <View className="flex-row justify-between items-center px-2">
                      <View className="items-start flex-1">
                        <Text className="text-xs font-medium uppercase mb-1" style={{ color: colors.textSecondary }}>From</Text>
                        <Text className="text-base font-bold" style={{ color: colors.text }}>{ticket.from_city}</Text>
                      </View>
                      <ChevronRight size={20} color={colors.border} />
                      <View className="items-end flex-1">
                        <Text className="text-xs font-medium uppercase mb-1" style={{ color: colors.textSecondary }}>To</Text>
                        <Text className="text-base font-bold text-right" style={{ color: colors.text }}>{ticket.to_city}</Text>
                      </View>
                    </View>
                  </View>
                  <View className="p-5 flex-row justify-between items-center">
                    <View className="flex-1 flex-row flex-wrap">
                      <View className="mr-6 mb-2">
                        <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Date</Text>
                        <View className="flex-row items-center">
                          <Calendar size={12} color={colors.primary} />
                          <Text className="text-sm font-bold ml-1" style={{ color: colors.text }}>{new Date(ticket.departure_time).toLocaleDateString()}</Text>
                        </View>
                      </View>
                      <View className="mr-6 mb-2">
                        <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Time</Text>
                        <View className="flex-row items-center">
                          <Clock size={12} color={colors.primary} />
                          <Text className="text-sm font-bold ml-1" style={{ color: colors.text }}>{new Date(ticket.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                      </View>
                      <View className="mr-6 mb-2">
                        <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Seat</Text>
                        <Text className="text-sm font-bold" style={{ color: colors.text }}>{ticket.seat_number}</Text>
                      </View>
                      <View>
                        <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Price</Text>
                        <View className="flex-row items-center">
                          <Wallet size={12} color={colors.primary} />
                          <Text className="text-sm font-bold ml-1" style={{ color: colors.primary }}>{parseFloat(ticket.price).toLocaleString()} RWF</Text>
                        </View>
                      </View>
                    </View>
                    <View className="ml-4 items-center justify-center p-2 rounded-2xl" style={{ backgroundColor: colors.background }}>
                      {ticket.qr_code ? (
                        <Image source={{ uri: getQrUrl(ticket.qr_code) }} style={{ width: 48, height: 48 }} />
                      ) : (
                        <TicketIcon size={32} color={colors.border} />
                      )}
                      <Text className="text-[8px] font-bold mt-1" style={{ color: colors.textSecondary }}>SCAN</Text>
                    </View>
                  </View>
                  {/* Delete button */}
                  <TouchableOpacity
                    onPress={() => handleDelete(ticket.id, 'bus')}
                    className="mx-5 mb-4 py-2 rounded-xl items-center flex-row justify-center gap-2"
                    style={{ backgroundColor: '#FDECEA' }}>
                    <Trash2 size={14} color="#C0392B" />
                    <Text className="text-xs font-bold" style={{ color: '#C0392B' }}>Delete Ticket</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })
          )
        ) : (
          // CAR BOOKINGS
          carBookings.length === 0 ? (
            <View className="flex-1 justify-center items-center py-20">
              <Car size={40} color={colors.border} />
              <Text className="text-lg font-bold mt-4" style={{ color: colors.textSecondary }}>No car bookings yet.</Text>
              <TouchableOpacity onPress={() => navigation.navigate('PrivateCarBooking')} className="mt-4 px-6 py-3 rounded-full" style={{ backgroundColor: colors.primary }}>
                <Text className="text-white font-bold">Book a Car</Text>
              </TouchableOpacity>
            </View>
          ) : (
            carBookings.map((booking) => {
              const statusStyle = getStatusColor(booking.status);
              return (
                <TouchableOpacity key={booking.id} className="mb-6 rounded-3xl overflow-hidden shadow-lg" style={{ backgroundColor: colors.surface }} activeOpacity={0.9} onPress={() => handleTicketPress({ ...booking, type: 'car' })}>
                  <View className="p-5 border-b-2 border-dashed" style={{ borderBottomColor: colors.background }}>
                    <View className="flex-row justify-between items-center mb-3">
                      <View className="flex-row items-center">
                        <View className="w-10 h-10 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: colors.primaryLight }}>
                          <Car size={20} color={colors.primary} />
                        </View>
                        <View>
                          <Text className="text-base font-bold" style={{ color: colors.text }}>{booking.car_model}</Text>
                          <Text className="text-xs" style={{ color: colors.textSecondary }}>{booking.driver_name} • {booking.plate}</Text>
                        </View>
                      </View>
                      <View className="px-3 py-1 rounded-full" style={{ backgroundColor: statusStyle.bg }}>
                        <Text className="text-[10px] font-bold uppercase" style={{ color: statusStyle.text }}>{booking.status}</Text>
                      </View>
                    </View>
                    <View className="flex-row justify-between px-2">
                      <View className="flex-1">
                        <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Pickup</Text>
                        <View className="flex-row items-center">
                          <MapPin size={12} color={colors.primary} />
                          <Text className="text-sm font-bold ml-1" style={{ color: colors.text }} numberOfLines={1}>{booking.pickup_location}</Text>
                        </View>
                      </View>
                      <ChevronRight size={18} color={colors.border} />
                      <View className="flex-1 items-end">
                        <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Dropoff</Text>
                        <Text className="text-sm font-bold text-right" style={{ color: colors.text }} numberOfLines={1}>{booking.dropoff_location}</Text>
                      </View>
                    </View>
                  </View>
                  <View className="p-5 flex-row justify-between items-center">
                    <View className="flex-1 flex-row flex-wrap">
                      <View className="mr-6 mb-2">
                        <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Pickup Time</Text>
                        <View className="flex-row items-center">
                          <Clock size={12} color={colors.primary} />
                          <Text className="text-sm font-bold ml-1" style={{ color: colors.text }}>{new Date(booking.pickup_time).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                      </View>
                      <View className="mr-6 mb-2">
                        <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Distance</Text>
                        <Text className="text-sm font-bold" style={{ color: colors.text }}>{booking.distance_km} km</Text>
                      </View>
                      <View>
                        <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Total</Text>
                        <View className="flex-row items-center">
                          <Wallet size={12} color={colors.primary} />
                          <Text className="text-sm font-bold ml-1" style={{ color: colors.primary }}>{parseFloat(booking.total_price).toLocaleString()} RWF</Text>
                        </View>
                      </View>
                    </View>
                    <View className="ml-4 items-center justify-center p-2 rounded-2xl" style={{ backgroundColor: colors.background }}>
                      {booking.qr_code ? (
                        <Image source={{ uri: getQrUrl(booking.qr_code) }} style={{ width: 48, height: 48 }} />
                      ) : (
                        <Car size={32} color={colors.border} />
                      )}
                      <Text className="text-[8px] font-bold mt-1" style={{ color: colors.textSecondary }}>SCAN</Text>
                    </View>
                  </View>
                  {/* Delete button */}
                  <TouchableOpacity
                    onPress={() => handleDelete(booking.id, 'car')}
                    className="mx-5 mb-4 py-2 rounded-xl items-center flex-row justify-center gap-2"
                    style={{ backgroundColor: '#FDECEA' }}>
                    <Trash2 size={14} color="#C0392B" />
                    <Text className="text-xs font-bold" style={{ color: '#C0392B' }}>Delete Booking</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })
          )
        )}
        <View className="h-10" />
      </ScrollView>

      {/* QR Modal */}
      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <Pressable className="flex-1 justify-center items-center bg-black/60 px-6" onPress={() => setModalVisible(false)}>
          <View className="w-full rounded-[40px] p-8 items-center shadow-2xl" style={{ backgroundColor: colors.surface }}>
            <TouchableOpacity onPress={() => setModalVisible(false)} className="absolute top-6 right-6 p-2 rounded-full" style={{ backgroundColor: colors.background }}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>

            <Text className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Boarding Pass</Text>
            <Text className="text-sm font-medium mb-6 text-center" style={{ color: colors.textSecondary }}>
              Show this QR code to the driver or terminal attendant.
            </Text>

            {selectedTicket?.qr_code ? (
              <Image
                source={{ uri: getQrUrl(selectedTicket.qr_code) }}
                style={{ width: width * 0.55, height: width * 0.55, borderRadius: 16 }}
              />
            ) : (
              <View className="p-8 rounded-[30px] items-center justify-center mb-4" style={{ backgroundColor: colors.primaryLight }}>
                <Text className="text-sm font-medium" style={{ color: colors.primary }}>QR code not yet generated.{'\n'}Complete payment to get your QR.</Text>
              </View>
            )}

            {selectedTicket && (
              <View className="w-full items-center mt-6 mb-4">
                <Text className="text-xl font-bold" style={{ color: colors.primary }}>
                  {selectedTicket.type === 'car' ? selectedTicket.car_model : selectedTicket.bus_name}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-base font-semibold" style={{ color: colors.text }}>
                    {selectedTicket.type === 'car' ? selectedTicket.pickup_location : selectedTicket.from_city}
                  </Text>
                  <ChevronRight size={16} color={colors.textSecondary} />
                  <Text className="text-base font-semibold" style={{ color: colors.text }}>
                    {selectedTicket.type === 'car' ? selectedTicket.dropoff_location : selectedTicket.to_city}
                  </Text>
                </View>
                <Text className="text-sm font-medium mt-1" style={{ color: colors.textSecondary }}>
                  {selectedTicket.type === 'car'
                    ? `${selectedTicket.driver_name} • ${selectedTicket.distance_km} km`
                    : `Seat ${selectedTicket.seat_number} • ${new Date(selectedTicket.departure_time).toLocaleString()}`
                  }
                </Text>
              </View>
            )}

            <View className="w-full py-4 rounded-2xl items-center" style={{ backgroundColor: colors.primary }}>
              <Text className="text-white text-lg font-bold">READY TO SCAN</Text>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default TicketsScreen;
