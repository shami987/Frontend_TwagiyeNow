import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { CreditCard, Smartphone, Wallet, Plus } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import SettingsRow from '../components/SettingsRow';

const PaymentMethodsScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Saved Methods</Text>
          <SettingsRow 
            label="MTN Mobile Money" 
            value="**** 000" 
            icon={Smartphone} 
            onPress={() => {}} 
          />
          <SettingsRow 
            label="Visa Card" 
            value="**** 1234" 
            icon={CreditCard} 
            onPress={() => {}} 
          />
          <SettingsRow 
            label="Twagiye Wallet" 
            value="15,000 RWF" 
            icon={Wallet} 
            onPress={() => {}} 
          />
        </View>

        <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.surface, borderColor: colors.primaryLight }]}>
          <Plus size={20} color={colors.primary} />
          <Text style={[styles.addButtonText, { color: colors.primary }]}>Add New Payment Method</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  addButtonText: {
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PaymentMethodsScreen;
