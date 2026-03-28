import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Search, HelpCircle, MessageCircle, Phone, Mail, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';

const HELP_TOPICS = [
  { id: '1', title: 'How to book a ticket?', icon: HelpCircle },
  { id: '2', title: 'Payment methods & issues', icon: HelpCircle },
  { id: '3', title: 'Track your bus live', icon: HelpCircle },
  { id: '4', title: 'Cancellations & refunds', icon: HelpCircle },
  { id: '5', title: 'Account & Security', icon: HelpCircle },
];

const HelpCenterScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={styles.headerTitle}>How can we help you?</Text>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <Text style={[styles.searchText, { color: colors.textSecondary }]}>Search for help...</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Questions</Text>
          {HELP_TOPICS.map((topic) => (
            <TouchableOpacity 
              key={topic.id} 
              style={[styles.topicItem, { borderBottomColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.topicTitle, { color: colors.text }]}>{topic.title}</Text>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Support</Text>
          <View style={styles.contactGrid}>
            <TouchableOpacity style={[styles.contactCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <MessageCircle size={24} color={colors.primary} />
              <Text style={[styles.contactText, { color: colors.text }]}>Live Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.contactCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Phone size={24} color={colors.primary} />
              <Text style={[styles.contactText, { color: colors.text }]}>Call Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.contactCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Mail size={24} color={colors.primary} />
              <Text style={[styles.contactText, { color: colors.text }]}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 32,
    paddingTop: 48,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchText: {
    fontSize: 16,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  topicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  topicTitle: {
    fontSize: 16,
  },
  contactGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  contactCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  contactText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HelpCenterScreen;
