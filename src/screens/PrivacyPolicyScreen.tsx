import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';

const PrivacyPolicyScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>Last updated: October 2023</Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>1. Introduction</Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            Welcome to TwagiyeNow. We respect your privacy and want to protect your personal data. 
            This Privacy Policy will inform you as to how we look after your personal data when you 
            visit our application and tell you about your privacy rights.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>2. The Data We Collect</Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            We may collect, use, store and transfer different kinds of personal data about you which 
            we have grouped together as follows:
          </Text>
          <Text style={[styles.bullet, { color: colors.textSecondary }]}>• Identity Data: first name, last name, username.</Text>
          <Text style={[styles.bullet, { color: colors.textSecondary }]}>• Contact Data: email address, telephone numbers.</Text>
          <Text style={[styles.bullet, { color: colors.textSecondary }]}>• Transaction Data: details about payments to and from you.</Text>
          <Text style={[styles.bullet, { color: colors.textSecondary }]}>• Technical Data: IP address, login data, browser type and version.</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>3. How We Use Your Data</Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            We will only use your personal data when the law allows us to. Most commonly, we will use 
            your personal data in the following circumstances:
          </Text>
          <Text style={[styles.bullet, { color: colors.textSecondary }]}>• To register you as a new customer.</Text>
          <Text style={[styles.bullet, { color: colors.textSecondary }]}>• To process and deliver your orders.</Text>
          <Text style={[styles.bullet, { color: colors.textSecondary }]}>• To manage our relationship with you.</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>4. Data Security</Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            We have put in place appropriate security measures to prevent your personal data from being 
            accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
    marginBottom: 4,
  },
});

export default PrivacyPolicyScreen;
