import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bus, Repeat, Navigation } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import StatusPill, { TripStatus } from './StatusPill';

interface HistoryCardProps {
  route: string;
  date: string;
  status: TripStatus;
  price: string;
  distance?: string;
  onReuse?: () => void;
  onPress?: () => void;
}

const HistoryCard = ({ route, date, status, price, distance, onReuse, onPress }: HistoryCardProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.surface, shadowColor: colors.text }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.routeInfo}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
            <Bus size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.routeText, { color: colors.text }]}>{route}</Text>
            <View className="flex-row items-center">
              <Text style={[styles.dateText, { color: colors.textSecondary }]}>{date}</Text>
              {distance && (
                <View className="flex-row items-center ml-2 bg-gray-100 px-2 py-0.5 rounded-full">
                  <Navigation size={10} color={colors.textSecondary} />
                  <Text className="text-[10px] ml-1 font-medium" style={{ color: colors.textSecondary }}>{distance}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <StatusPill status={status} />
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.footer}>
        <Text style={[styles.priceText, { color: colors.text }]}>{price}</Text>
        <TouchableOpacity style={[styles.reuseButton, { backgroundColor: colors.primaryLight }]} onPress={onReuse}>
          <Repeat size={16} color={colors.primary} style={styles.reuseIcon} />
          <Text style={[styles.reuseText, { color: colors.primary }]}>Reuse Ticket</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reuseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reuseIcon: {
    marginRight: 4,
  },
  reuseText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HistoryCard;
