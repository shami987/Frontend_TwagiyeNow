import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, AlertTriangle, Tag } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

export type NotificationType = 'delay' | 'cancellation' | 'promo' | 'info';

interface NotificationCardProps {
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  onPress?: () => void;
}

const NotificationCard = ({ type, title, description, time, isRead, onPress }: NotificationCardProps) => {
  const { colors } = useTheme();

  const getIcon = () => {
    switch (type) {
      case 'delay':
        return <AlertTriangle size={20} color={colors.warning} />;
      case 'cancellation':
        return <AlertTriangle size={20} color={colors.error} />;
      case 'promo':
        return <Tag size={20} color={colors.primary} />;
      default:
        return <Bell size={20} color={colors.primary} />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'delay':
        return colors.warning + '20';
      case 'cancellation':
        return colors.error + '20';
      case 'promo':
        return colors.primaryLight;
      default:
        return colors.primaryLight;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.border }, !isRead && { backgroundColor: colors.primary + '10' }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconBg() }]}>
        {getIcon()}
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }, !isRead && styles.unreadText]}>{title}</Text>
          {!isRead && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
        </View>
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>{description}</Text>
        <Text style={[styles.time, { color: colors.textSecondary }]}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  unreadText: {
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
  },
});

export default NotificationCard;
