import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, Globe, CreditCard, Shield, LogOut, Moon, HelpCircle } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import ProfileAvatar from '../components/ProfileAvatar';
import SettingsRow from '../components/SettingsRow';
import { getUser } from '../services/storage';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const { theme, colors, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [userData, setUserData] = useState({
    name: 'Jean Doe',
    email: 'jean.doe@example.com'
  });

  const isDarkMode = theme === 'dark';

  // Load user data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const user = await getUser();
      if (user) {
        setUserData({
          name: user.name || 'Jean Doe',
          email: user.email || 'jean.doe@example.com'
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('confirm_logout'),
      [
        { text: t('cancel'), style: "cancel" },
        { text: t('logout'), style: "destructive", onPress: () => console.log("Logged out") }
      ]
    );
  };

  const currentLanguageName = () => {
    switch (i18n.language) {
      case 'en': return 'English';
      case 'fr': return 'Français';
      case 'rw': return 'Ikinyarwanda';
      default: return i18n.language;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <ProfileAvatar name={userData.name} size={100} />
          <Text style={[styles.userName, { color: colors.text }]}>{userData.name}</Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{userData.email}</Text>
          <TouchableOpacity 
            style={[styles.editButton, { borderColor: colors.primary }]} 
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={[styles.editButtonText, { color: colors.primary }]}>{t('edit_profile')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t('account_settings')}</Text>
          <SettingsRow 
            label={t('personal_info')} 
            icon={User} 
            onPress={() => navigation.navigate('PersonalInformation')} 
          />
          <SettingsRow 
            label={t('payment_methods')} 
            icon={CreditCard} 
            onPress={() => navigation.navigate('PaymentMethods')} 
          />
          <SettingsRow 
            label={t('language')} 
            value={currentLanguageName()} 
            icon={Globe} 
            onPress={() => navigation.navigate('Language')} 
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t('preferences')}</Text>
          <SettingsRow 
            label={t('notifications')} 
            icon={Bell} 
            showSwitch 
            switchValue={notificationsEnabled}
            onSwitchChange={setNotificationsEnabled}
          />
          <SettingsRow 
            label={t('dark_mode')} 
            icon={Moon} 
            showSwitch 
            switchValue={isDarkMode}
            onSwitchChange={toggleTheme}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t('support_legal')}</Text>
          <SettingsRow 
            label={t('help_center')} 
            icon={HelpCircle} 
            onPress={() => navigation.navigate('HelpCenter')} 
          />
          <SettingsRow 
            label={t('privacy_policy')} 
            icon={Shield} 
            onPress={() => navigation.navigate('PrivacyPolicy')} 
          />
          <SettingsRow 
            label={t('logout')} 
            icon={LogOut} 
            onPress={handleLogout} 
            destructive
            showChevron={false}
          />
        </View>

        <Text style={[styles.versionText, { color: colors.textSecondary }]}>{t('version')} 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  userEmail: {
    fontSize: 14,
    marginTop: 4,
  },
  editButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  editButtonText: {
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    marginVertical: 32,
  },
});

export default ProfileScreen;
