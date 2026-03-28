import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { History, MapPin, Calendar, Clock, Ticket as TicketIcon, QrCode, ChevronRight, X } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

// Dummy Rwandan ticket data
const DUMMY_TICKETS = [
  {
    id: 'RT-2022',
    busName: 'RITCO Express',
    from: 'Nyabugogo, Kigali',
    to: 'Musanze City',
    date: 'March 29, 2026',
    time: '07:00 AM',
    seat: '12',
    gate: '02',
    status: 'Upcoming',
    price: '3,000 RWF',
  },
  {
    id: 'HZ-4055',
    busName: 'HORIZON Ltd',
    from: 'Nyabugogo, Kigali',
    to: 'Huye Center',
    date: 'March 30, 2026',
    time: '09:30 AM',
    seat: '05',
    gate: '05',
    status: 'Confirmed',
    price: '2,500 RWF',
  },
];

const TicketsScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTicketPress = (ticket: any) => {
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="px-4 pt-5 pb-6 flex-row justify-between items-center border-b" style={{ backgroundColor: colors.surface, borderBottomColor: colors.border }}>
        <Text className="text-3xl font-bold" style={{ color: colors.text }}>My Tickets</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('BookingHistory')}
          className="p-2 rounded-full"
          style={{ backgroundColor: colors.primaryLight }}
        >
          <History size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        {DUMMY_TICKETS.length > 0 ? (
          DUMMY_TICKETS.map((ticket) => (
            <TouchableOpacity 
              key={ticket.id}
              className="mb-6 rounded-3xl overflow-hidden shadow-lg"
              style={{ backgroundColor: colors.surface }}
              activeOpacity={0.9}
              onPress={() => handleTicketPress(ticket)}
            >
              {/* Ticket Top Part */}
              <View className="p-5 border-b-2 border-dashed" style={{ borderBottomColor: colors.background }}>
                <View className="flex-row justify-between items-center mb-4">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: colors.primaryLight }}>
                      <TicketIcon size={20} color={colors.primary} />
                    </View>
                    <View>
                      <Text className="text-base font-bold" style={{ color: colors.text }}>{ticket.busName}</Text>
                      <Text className="text-xs font-medium" style={{ color: colors.textSecondary }}>Ticket ID: {ticket.id}</Text>
                    </View>
                  </View>
                  <View className="px-3 py-1 rounded-full" style={{ backgroundColor: ticket.status === 'Upcoming' ? '#E8F5E9' : '#E3F2FD' }}>
                    <Text className="text-[10px] font-bold uppercase" style={{ color: ticket.status === 'Upcoming' ? '#2E7D32' : '#1976D2' }}>{ticket.status}</Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center px-2">
                  <View className="items-start flex-1">
                    <Text className="text-xs font-medium uppercase mb-1" style={{ color: colors.textSecondary }}>From</Text>
                    <Text className="text-base font-bold" style={{ color: colors.text }}>{ticket.from}</Text>
                  </View>
                  <View className="px-4">
                    <ChevronRight size={20} color={colors.border} />
                  </View>
                  <View className="items-end flex-1">
                    <Text className="text-xs font-medium uppercase mb-1" style={{ color: colors.textSecondary }}>To</Text>
                    <Text className="text-base font-bold text-right" style={{ color: colors.text }}>{ticket.to}</Text>
                  </View>
                </View>
              </View>

              {/* Ticket Bottom Part */}
              <View className="p-5 flex-row justify-between items-center">
                <View className="flex-1 flex-row flex-wrap">
                  <View className="mr-6 mb-3">
                    <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Date</Text>
                    <View className="flex-row items-center">
                      <Calendar size={12} color={colors.primary} className="mr-1" />
                      <Text className="text-sm font-bold" style={{ color: colors.text }}>{ticket.date}</Text>
                    </View>
                  </View>
                  <View className="mr-6 mb-3">
                    <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Time</Text>
                    <View className="flex-row items-center">
                      <Clock size={12} color={colors.primary} className="mr-1" />
                      <Text className="text-sm font-bold" style={{ color: colors.text }}>{ticket.time}</Text>
                    </View>
                  </View>
                  <View className="mr-6">
                    <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Seat</Text>
                    <Text className="text-sm font-bold" style={{ color: colors.text }}>{ticket.seat}</Text>
                  </View>
                  <View>
                    <Text className="text-[10px] font-medium uppercase mb-0.5" style={{ color: colors.textSecondary }}>Gate</Text>
                    <Text className="text-sm font-bold" style={{ color: colors.text }}>{ticket.gate}</Text>
                  </View>
                </View>
                
                <View className="ml-4 items-center justify-center p-3 rounded-2xl" style={{ backgroundColor: colors.background }}>
                  <QrCode size={40} color={colors.text} />
                  <Text className="text-[8px] font-bold mt-1" style={{ color: colors.textSecondary }}>SCAN</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <View className="w-20 h-20 rounded-full items-center justify-center mb-4" style={{ backgroundColor: colors.surface }}>
              <TicketIcon size={40} color={colors.border} />
            </View>
            <Text className="text-lg font-bold" style={{ color: colors.textSecondary }}>No active tickets found.</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('MainHome')}
              className="mt-4 px-6 py-3 rounded-full"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-white font-bold">Book a Ticket</Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="h-10" />
      </ScrollView>

      {/* QR Code Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          className="flex-1 justify-center items-center bg-black/60 px-6"
          onPress={() => setModalVisible(false)}
        >
          <View 
            className="w-full rounded-[40px] p-8 items-center shadow-2xl"
            style={{ backgroundColor: colors.surface }}
          >
            {/* Close Button */}
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              className="absolute top-6 right-6 p-2 rounded-full"
              style={{ backgroundColor: colors.background }}
            >
              <X size={24} color={colors.text} />
            </TouchableOpacity>

            <Text className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Boarding Pass</Text>
            <Text className="text-sm font-medium mb-8 text-center" style={{ color: colors.textSecondary }}>
              Please show this QR code to the driver or terminal attendant.
            </Text>

            {/* Large QR Code Container */}
            <View 
              className="p-8 rounded-[30px] items-center justify-center mb-8 border-4 border-dashed"
              style={{ backgroundColor: colors.white, borderColor: colors.primaryLight }}
            >
              <QrCode size={width * 0.5} color={colors.black} />
            </View>

            {/* Ticket Summary */}
            {selectedTicket && (
              <View className="w-full items-center mb-8">
                <Text className="text-xl font-bold" style={{ color: colors.primary }}>{selectedTicket.busName}</Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-base font-semibold" style={{ color: colors.text }}>{selectedTicket.from}</Text>
                  <ChevronRight size={16} color={colors.textSecondary} className="mx-2" />
                  <Text className="text-base font-semibold" style={{ color: colors.text }}>{selectedTicket.to}</Text>
                </View>
                <Text className="text-sm font-medium mt-2" style={{ color: colors.textSecondary }}>
                  Seat {selectedTicket.seat} • Gate {selectedTicket.gate} • {selectedTicket.time}
                </Text>
              </View>
            )}

            {/* Instructions */}
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