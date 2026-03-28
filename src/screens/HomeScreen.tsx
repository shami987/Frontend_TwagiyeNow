import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

const HomeScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.primary }]}>TwagiyeNow</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Bell size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={[styles.text, { color: colors.text }]}>Welcome to TwagiyeNow!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default HomeScreen;
