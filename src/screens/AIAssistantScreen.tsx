import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { Bot, Send, ArrowLeft } from 'lucide-react-native';

const AIAssistantScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center border-b" style={{ backgroundColor: colors.surface, borderBottomColor: colors.border }}>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: colors.primaryLight }}>
            <Bot size={24} color={colors.primary} />
          </View>
          <Text className="text-xl font-bold" style={{ color: colors.text }}>AI Assistant</Text>
        </View>
      </View>

      {/* Chat Area */}
      <ScrollView className="flex-1 px-4 pt-6">
        <View className="flex-row mb-6">
          <View className="w-8 h-8 rounded-full items-center justify-center mr-2 mt-1" style={{ backgroundColor: colors.primaryLight }}>
            <Bot size={18} color={colors.primary} />
          </View>
          <View className="flex-1 rounded-2xl p-4 shadow-sm" style={{ backgroundColor: colors.surface }}>
            <Text className="text-base leading-6" style={{ color: colors.text }}>
              Hello! I am your AI assistant. I can help you plan your perfect trip, find the best bus routes, and organize your travel schedule. Thank you for choosing TwaguyeNow.
            </Text>
            <Text className="text-base leading-6 mt-3" style={{ color: colors.text }}>
              Where would you like to go today?
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Input Area (Mockup) */}
      <View className="p-4 border-t" style={{ backgroundColor: colors.surface, borderTopColor: colors.border }}>
        <View className="flex-row items-center rounded-full px-4 py-2 border" style={{ borderColor: colors.border }}>
          <Text className="flex-1 text-base" style={{ color: colors.textSecondary }}>Type your travel plans...</Text>
          <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: colors.primary }}>
            <Send size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AIAssistantScreen;