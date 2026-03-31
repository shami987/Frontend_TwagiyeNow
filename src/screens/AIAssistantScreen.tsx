import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bot, Send, ArrowLeft, Navigation, Bus, Bell } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { sendMessageToGemini, ChatHistory } from '../api/gemini';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  navigationAction?: any;
}

const parseNavigation = (text: string): { cleanText: string; action: any } => {
  try {
    const lines = text.trim().split('\n');
    const lastLine = lines[lines.length - 1].trim();
    if (lastLine.startsWith('{') && lastLine.endsWith('}')) {
      return { cleanText: lines.slice(0, -1).join('\n').trim(), action: JSON.parse(lastLine) };
    }
  } catch {}
  return { cleanText: text, action: null };
};

const AIAssistantScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Muraho! Ndi TwagiyeNow Smart Assistant. Ngufashe iki uyu munsi?\n\n(Hello! I am TwagiyeNow Smart Assistant. How can I help you today?)',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, isLoading]);

  const handleNavigationAction = (action: any) => {
    if (!action) return;
    switch (action.action) {
      case 'NAVIGATE_SEARCH':
        navigation.navigate('BusSearchResults', {
          from: action.params?.from || '',
          to: action.params?.to || '',
        });
        break;
      case 'NAVIGATE_TRACK':
        navigation.navigate('LiveTrack');
        break;
      case 'NAVIGATE_NOTIFICATIONS':
        navigation.navigate('Notifications');
        break;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input.trim() };
    const currentInput = input.trim();
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history: ChatHistory = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const responseText = await sendMessageToGemini(currentInput, history);
      const { cleanText, action } = parseNavigation(responseText);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: cleanText,
        navigationAction: action,
      };

      setMessages(prev => [...prev, aiMsg]);

      if (action) {
        setTimeout(() => handleNavigationAction(action), 800);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { id: 'err-' + Date.now(), role: 'model', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionIcon = (action: any) => {
    if (!action) return null;
    switch (action.action) {
      case 'NAVIGATE_SEARCH': return <Bus size={12} color={colors.primary} />;
      case 'NAVIGATE_TRACK': return <Navigation size={12} color={colors.primary} />;
      case 'NAVIGATE_NOTIFICATIONS': return <Bell size={12} color={colors.primary} />;
      default: return null;
    }
  };

  const getActionLabel = (action: any) => {
    switch (action?.action) {
      case 'NAVIGATE_SEARCH': return 'Opening bus search...';
      case 'NAVIGATE_TRACK': return 'Opening live tracker...';
      case 'NAVIGATE_NOTIFICATIONS': return 'Opening notifications...';
      default: return '';
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View
        className="px-4 py-4 flex-row items-center border-b"
        style={{ backgroundColor: colors.surface, borderBottomColor: colors.border }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: colors.primaryLight }}
        >
          <Bot size={22} color={colors.primary} />
        </View>
        <View>
          <Text className="text-base font-bold" style={{ color: colors.text }}>AI Trip Assistant</Text>
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-green-500 mr-1" />
            <Text className="text-[10px]" style={{ color: colors.textSecondary }}>Online · Kinyarwanda & English</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {messages.map(m => (
            <View
              key={m.id}
              className={`flex-row mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'model' && (
                <View
                  className="w-8 h-8 rounded-full items-center justify-center mr-2 mt-1 self-end"
                  style={{ backgroundColor: colors.primaryLight }}
                >
                  <Bot size={16} color={colors.primary} />
                </View>
              )}
              <View style={{ maxWidth: '78%' }}>
                <View
                  className="rounded-2xl px-4 py-3"
                  style={{
                    backgroundColor: m.role === 'user' ? colors.primary : colors.surface,
                    borderBottomRightRadius: m.role === 'user' ? 4 : 16,
                    borderBottomLeftRadius: m.role === 'model' ? 4 : 16,
                  }}
                >
                  <Text
                    className="text-sm leading-6"
                    style={{ color: m.role === 'user' ? '#fff' : colors.text }}
                  >
                    {m.text}
                  </Text>
                  {m.navigationAction && (
                    <View
                      className="flex-row items-center mt-2 pt-2"
                      style={{ borderTopWidth: 1, borderTopColor: colors.border }}
                    >
                      {getActionIcon(m.navigationAction)}
                      <Text
                        className="text-[10px] font-bold ml-1 uppercase tracking-wider"
                        style={{ color: colors.primary }}
                      >
                        {getActionLabel(m.navigationAction)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}

          {isLoading && (
            <View className="flex-row mb-4 justify-start">
              <View
                className="w-8 h-8 rounded-full items-center justify-center mr-2 self-end"
                style={{ backgroundColor: colors.primaryLight }}
              >
                <Bot size={16} color={colors.primary} />
              </View>
              <View
                className="rounded-2xl px-5 py-4"
                style={{ backgroundColor: colors.surface, borderBottomLeftRadius: 4 }}
              >
                <View className="flex-row items-center gap-1" style={{ gap: 4 }}>
                  {[0, 1, 2].map(i => (
                    <View
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.textSecondary, opacity: 0.5 + i * 0.2 }}
                    />
                  ))}
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View
          className="px-4 py-3 border-t"
          style={{ backgroundColor: colors.surface, borderTopColor: colors.border }}
        >
          <View
            className="flex-row items-center rounded-full px-4 border"
            style={{ borderColor: colors.border, backgroundColor: colors.background }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ndashaka kujya i Musanze..."
              placeholderTextColor={colors.textSecondary}
              className="flex-1 text-sm py-3"
              style={{ color: colors.text }}
              onSubmitEditing={handleSend}
              returnKeyType="send"
              multiline={false}
            />
            <TouchableOpacity
              onPress={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-full items-center justify-center ml-2"
              style={{ backgroundColor: input.trim() ? colors.primary : colors.border }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Send size={16} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
          <Text
            className="text-[9px] text-center mt-2 uppercase tracking-widest"
            style={{ color: colors.textSecondary }}
          >
            Kinyarwanda & English Supported
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AIAssistantScreen;
