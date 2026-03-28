import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Bell, CheckCircle2 } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import NotificationCard, { NotificationType } from '../components/NotificationCard';

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'delay',
    title: 'Bus Delayed',
    description: 'Line 102 (Kigali - Musanze) is delayed by 15 minutes due to heavy rain.',
    time: '10 mins ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'promo',
    title: 'Weekend Promo!',
    description: 'Get 20% off on all tickets booked for this Saturday and Sunday. Use code: WEEKEND20',
    time: '2 hours ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'cancellation',
    title: 'Trip Cancelled',
    description: 'We regret to inform you that your trip at 14:00 has been cancelled. Please visit the station for a refund or reschedule.',
    time: 'Yesterday',
    isRead: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'New Route Added',
    description: 'We now serve Kigali - Rubavu route every hour! Book your next trip now.',
    time: '2 days ago',
    isRead: true,
  },
];

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const { colors } = useTheme();

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <NotificationCard
      type={item.type}
      title={item.title}
      description={item.description}
      time={item.time}
      isRead={item.isRead}
      onPress={() => markAsRead(item.id)}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
        <TouchableOpacity style={styles.markReadButton} onPress={markAllAsRead}>
          <CheckCircle2 size={18} color={colors.primary} />
          <Text style={[styles.markReadText, { color: colors.primary }]}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Bell size={64} color={colors.border} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No notifications yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markReadText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
  },
});

export default NotificationsScreen;
