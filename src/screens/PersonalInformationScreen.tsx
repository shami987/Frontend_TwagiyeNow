import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import SettingsRow from '../components/SettingsRow';
import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react-native';

const PersonalInformationScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <SettingsRow 
            label={t('full_name')} 
            value="Jean Doe" 
            icon={User} 
            showChevron={false}
          />
          <SettingsRow 
            label={t('email')} 
            value="jean.doe@example.com" 
            icon={Mail} 
            showChevron={false}
          />
          <SettingsRow 
            label={t('phone')} 
            value="+250 788 000 000" 
            icon={Phone} 
            showChevron={false}
          />
          <SettingsRow 
            label="Date of Birth" 
            value="Jan 01, 1995" 
            icon={Calendar} 
            showChevron={false}
          />
          <SettingsRow 
            label="Location" 
            value="Kigali, Rwanda" 
            icon={MapPin} 
            showChevron={false}
          />
        </View>
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
});

export default PersonalInformationScreen;
