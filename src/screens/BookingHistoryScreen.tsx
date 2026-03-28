import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import HistoryCard from '../components/HistoryCard';
import { TripStatus } from '../components/StatusPill';

interface BookingItem {
  id: string;
  route: string;
  date: string;
  status: TripStatus;
  price: string;
}

const HISTORY_DATA: BookingItem[] = [
  {
    id: '1',
    route: 'Kigali - Musanze',
    date: 'Oct 15, 2023 | 08:30',
    status: 'confirmed',
    price: '3,500 RWF',
  },
  {
    id: '2',
    route: 'Musanze - Kigali',
    date: 'Oct 12, 2023 | 16:00',
    status: 'confirmed',
    price: '3,500 RWF',
  },
  {
    id: '3',
    route: 'Kigali - Rubavu',
    date: 'Oct 05, 2023 | 09:15',
    status: 'delayed',
    price: '5,000 RWF',
  },
  {
    id: '4',
    route: 'Rubavu - Kigali',
    date: 'Sep 28, 2023 | 14:00',
    status: 'cancelled',
    price: '5,000 RWF',
  },
];

const BookingHistoryScreen = () => {
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: BookingItem }) => (
    <HistoryCard
      route={item.route}
      date={item.date}
      status={item.status}
      price={item.price}
      onReuse={() => console.log('Reuse ticket', item.id)}
      onPress={() => console.log('Trip details', item.id)}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Booking History</Text>
      </View>
      <FlatList
        data={HISTORY_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
});

export default BookingHistoryScreen;
