import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Check, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
];

const LanguageScreen = ({ navigation }: any) => {
  const { i18n } = useTranslation();
  const { colors } = useTheme();

  const currentLanguage = i18n.language;

  const handleLanguageSelect = (code: string) => {
    i18n.changeLanguage(code);
  };

  const renderItem = ({ item }: { item: typeof LANGUAGES[0] }) => {
    const isSelected = currentLanguage === item.code;

    return (
      <TouchableOpacity 
        style={[styles.languageItem, { backgroundColor: colors.surface }]} 
        onPress={() => handleLanguageSelect(item.code)}
        activeOpacity={0.7}
      >
        <View style={styles.languageInfo}>
          <Text style={[styles.languageName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.nativeName, { color: colors.textSecondary }]}>{item.nativeName}</Text>
        </View>
        {isSelected && <Check size={20} color={colors.primary} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Language</Text>
      </View>
      <FlatList
        data={LANGUAGES}
        renderItem={renderItem}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.border }]} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  listContent: {
    paddingVertical: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
  },
  nativeName: {
    fontSize: 14,
    marginTop: 2,
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
  },
});

export default LanguageScreen;
