import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export type TripStatus = 'confirmed' | 'delayed' | 'cancelled';

interface StatusPillProps {
  status: TripStatus;
}

const StatusPill = ({ status }: StatusPillProps) => {
  const { colors } = useTheme();

  const getStatusConfig = () => {
    switch (status) {
      case 'confirmed':
        return {
          bg: colors.success + '20',
          text: colors.success,
          label: 'Confirmed',
        };
      case 'delayed':
        return {
          bg: colors.warning + '20',
          text: colors.warning,
          label: 'Delayed',
        };
      case 'cancelled':
        return {
          bg: colors.error + '20',
          text: colors.error,
          label: 'Cancelled',
        };
      default:
        return {
          bg: colors.border,
          text: colors.textSecondary,
          label: status,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default StatusPill;
