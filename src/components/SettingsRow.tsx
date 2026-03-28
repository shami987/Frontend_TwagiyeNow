import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { ChevronRight, LucideIcon } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

interface SettingsRowProps {
  label: string;
  value?: string;
  icon?: LucideIcon;
  onPress?: () => void;
  showChevron?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  destructive?: boolean;
}

const SettingsRow = ({
  label,
  value,
  icon: Icon,
  onPress,
  showChevron = true,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  destructive = false,
}: SettingsRowProps) => {
  const { colors } = useTheme();

  const content = (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      <View style={styles.leftContent}>
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon size={20} color={destructive ? colors.error : colors.primary} />
          </View>
        )}
        <Text style={[styles.label, { color: colors.text }, destructive && { color: colors.error }]}>{label}</Text>
      </View>

      <View style={styles.rightContent}>
        {value && <Text style={[styles.value, { color: colors.textSecondary }]}>{value}</Text>}
        {showSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: colors.border, true: colors.primaryLight }}
            thumbColor={switchValue ? colors.primary : colors.textSecondary}
          />
        ) : (
          showChevron && <ChevronRight size={20} color={colors.textSecondary} />
        )}
      </View>
    </View>
  );

  if (showSwitch) {
    return content;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    marginRight: 8,
  },
});

export default SettingsRow;
