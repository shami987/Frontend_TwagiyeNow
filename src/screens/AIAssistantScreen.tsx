import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bot, Send, ArrowLeft, Navigation, Bus, Bell, Mic, Square, Sparkles, MapPin, Clock } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { sendMessageToGemini, sendVoiceToGemini, searchTripsForAI, ChatHistory } from '../api/gemini';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  navigationAction?: any;
  time?: string;
}

const SUGGESTIONS = [
  { label: '🚌 Kigali → Musanze', from: 'Kigali', to: 'Musanze' },
  { label: '🚌 Kigali → Huye', from: 'Kigali', to: 'Huye' },
  { label: '🚌 Kigali → Rubavu', from: 'Kigali', to: 'Rubavu' },
  { label: '📍 Track my bus', text: 'Where is my bus?' },
];

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

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Animated typing dots
const TypingDots = ({ color }: { color: string }) => {
  const dots = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

  useEffect(() => {
    const animations = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(dot, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 400, useNativeDriver: true }),
        ])
      )
    );
    animations.forEach(a => a.start());
    return () => animations.forEach(a => a.stop());
  }, []);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      {dots.map((dot, i) => (
        <Animated.View
          key={i}
          style={{
            width: 8, height: 8, borderRadius: 4,
            backgroundColor: color,
            transform: [{ translateY: dot.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }],
          }}
        />
      ))}
    </View>
  );
};

// Pulse animation for recording
const PulseRing = ({ color }: { color: string }) => {
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.4, duration: 600, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View style={{
      position: 'absolute', width: 52, height: 52, borderRadius: 26,
      backgroundColor: color + '30',
      transform: [{ scale: pulse }],
    }} />
  );
};

const AIAssistantScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Muraho! Ndi TwagiyeNow Smart Assistant. 👋\n\nNgufashe iki uyu munsi?\n(How can I help you today?)',
      time: now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, isLoading]);

  const speakText = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'en-US' });
  };

  const handleMic = async () => {
    if (isRecording) await stopRecording();
    else await startRecording();
  };

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recordingRef.current = recording;
      setIsRecording(true);
    } catch (err) {
      console.error('Start recording error:', err);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await recordingRef.current?.stopAndUnloadAsync();
      const uri = recordingRef.current?.getURI();
      recordingRef.current = null;
      if (!uri) return;

      const userMsg: Message = { id: Date.now().toString(), role: 'user', text: '🎤 Voice message', time: now() };
      setMessages(prev => [...prev, userMsg]);
      setIsLoading(true);

      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const history: ChatHistory = messages.map(m => ({ role: m.role, text: m.text }));
        const replyText = await sendVoiceToGemini(base64, history);
        const { cleanText, action } = parseNavigation(replyText);
        const aiMsg: Message = { id: Date.now().toString(), role: 'model', text: cleanText, navigationAction: action, time: now() };
        setMessages(prev => [...prev, aiMsg]);
        speakText(cleanText);
        if (action?.action === 'NAVIGATE_SEARCH') {
          await fetchAndPresentTrips(action.params?.from || '', action.params?.to || '', action.params?.date);
        } else if (action) {
          setTimeout(() => handleNavigationAction(action), 800);
        }
        setIsLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Stop recording error:', err);
      setIsLoading(false);
    }
  };

  const handleNavigationAction = (action: any) => {
    if (!action) return;
    switch (action.action) {
      case 'NAVIGATE_SEARCH':
        navigation.navigate('BusSearchResults', { from: action.params?.from || '', to: action.params?.to || '' });
        break;
      case 'NAVIGATE_TRACK': navigation.navigate('LiveTrack'); break;
      case 'NAVIGATE_NOTIFICATIONS': navigation.navigate('Notifications'); break;
      case 'NAVIGATE_BUS_DETAILS': navigation.navigate('BusDetails', { schedule: action.params?.schedule }); break;
      case 'NAVIGATE_CHECKOUT': navigation.navigate('PaymentMethods', { schedule: action.params?.schedule }); break;
    }
  };

  const fetchAndPresentTrips = async (from: string, to: string, date?: string) => {
    setIsLoading(true);
    try {
      const trips = await searchTripsForAI(from, to, date);
      if (trips.length === 0) {
        const msg: Message = { id: Date.now().toString(), role: 'model', text: `Sorry, no buses found from ${from} to ${to}. Try different cities or date.`, time: now() };
        setMessages(prev => [...prev, msg]);
        speakText(msg.text);
        return;
      }
      const history: ChatHistory = messages.map(m => ({ role: m.role, text: m.text }));
      const prompt = `Here are the available trips from ${from} to ${to}:\n\n${JSON.stringify(trips)}\n\nPresent these trips clearly to the user and ask which one they want to book.`;
      const responseText = await sendMessageToGemini(prompt, history);
      const { cleanText, action } = parseNavigation(responseText);
      const aiMsg: Message = { id: Date.now().toString(), role: 'model', text: cleanText, navigationAction: action, time: now() };
      setMessages(prev => [...prev, aiMsg]);
      speakText('I found some trips. Which bus would you like to book?');
    } catch {
      setMessages(prev => [...prev, { id: 'err-' + Date.now(), role: 'model', text: 'Failed to fetch trips. Please try again.', time: now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (overrideText?: string) => {
    const text = overrideText || input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history: ChatHistory = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(text, history);
      const { cleanText, action } = parseNavigation(responseText);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: cleanText, navigationAction: action, time: now() };
      setMessages(prev => [...prev, aiMsg]);
      speakText(cleanText);
      if (action?.action === 'NAVIGATE_SEARCH') {
        await fetchAndPresentTrips(action.params?.from || '', action.params?.to || '', action.params?.date);
      } else if (action) {
        setTimeout(() => handleNavigationAction(action), 800);
      }
    } catch {
      setMessages(prev => [...prev, { id: 'err-' + Date.now(), role: 'model', text: 'Sorry, something went wrong. Please try again.', time: now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionLabel = (action: any) => {
    switch (action?.action) {
      case 'NAVIGATE_SEARCH': return '🔍 Searching trips...';
      case 'NAVIGATE_TRACK': return '📍 Opening live tracker...';
      case 'NAVIGATE_NOTIFICATIONS': return '🔔 Opening notifications...';
      case 'NAVIGATE_BUS_DETAILS': return '🚌 Opening bus details...';
      case 'NAVIGATE_CHECKOUT': return '💳 Opening checkout...';
      default: return '';
    }
  };

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{
        paddingHorizontal: 16, paddingVertical: 14,
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: colors.primary,
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>

        {/* Avatar with glow */}
        <View style={{ position: 'relative', marginRight: 12 }}>
          <View style={{
            position: 'absolute', width: 46, height: 46, borderRadius: 23,
            backgroundColor: '#ffffff30', top: -3, left: -3,
          }} />
          <View style={{
            width: 40, height: 40, borderRadius: 20,
            backgroundColor: '#ffffff25',
            alignItems: 'center', justifyContent: 'center',
            borderWidth: 1.5, borderColor: '#ffffff50',
          }}>
            <Bot size={22} color="#fff" />
          </View>
          <View style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 11, height: 11, borderRadius: 6,
            backgroundColor: '#4ade80',
            borderWidth: 2, borderColor: colors.primary,
          }} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>AI Trip Assistant</Text>
            <View style={{ marginLeft: 6, backgroundColor: '#ffffff25', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold' }}>BETA</Text>
            </View>
          </View>
          <Text style={{ color: '#ffffff99', fontSize: 11, marginTop: 1 }}>
            {isRecording ? '🔴 Recording...' : isLoading ? '⏳ Thinking...' : '🟢 Online · Kinyarwanda & English'}
          </Text>
        </View>

        <Sparkles size={20} color="#ffffff80" />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0}>

        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Quick suggestion chips */}
          {showSuggestions && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: colors.textSecondary, fontSize: 11, fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                Quick Actions
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {SUGGESTIONS.map((s, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleSend(s.text || `Find a bus from ${s.from} to ${s.to}`)}
                    style={{
                      paddingHorizontal: 12, paddingVertical: 8,
                      borderRadius: 20, borderWidth: 1.5,
                      borderColor: colors.primary + '50',
                      backgroundColor: colors.primaryLight,
                    }}
                  >
                    <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '600' }}>{s.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Messages */}
          {messages.map(m => (
            <View key={m.id} style={{ flexDirection: 'row', marginBottom: 16, justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {m.role === 'model' && (
                <View style={{
                  width: 32, height: 32, borderRadius: 16,
                  backgroundColor: colors.primary,
                  alignItems: 'center', justifyContent: 'center',
                  marginRight: 8, alignSelf: 'flex-end',
                }}>
                  <Bot size={16} color="#fff" />
                </View>
              )}

              <View style={{ maxWidth: '78%' }}>
                <View style={{
                  borderRadius: 20,
                  paddingHorizontal: 14, paddingVertical: 10,
                  backgroundColor: m.role === 'user' ? colors.primary : colors.surface,
                  borderBottomRightRadius: m.role === 'user' ? 4 : 20,
                  borderBottomLeftRadius: m.role === 'model' ? 4 : 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.06,
                  shadowRadius: 4,
                  elevation: 2,
                }}>
                  <Text style={{ color: m.role === 'user' ? '#fff' : colors.text, fontSize: 14, lineHeight: 22 }}>
                    {m.text}
                  </Text>

                  {m.navigationAction && (
                    <View style={{
                      marginTop: 8, paddingTop: 8,
                      borderTopWidth: 1,
                      borderTopColor: m.role === 'user' ? '#ffffff30' : colors.border,
                      flexDirection: 'row', alignItems: 'center',
                    }}>
                      <View style={{
                        backgroundColor: colors.primary + '20',
                        paddingHorizontal: 8, paddingVertical: 4,
                        borderRadius: 10,
                      }}>
                        <Text style={{ color: colors.primary, fontSize: 10, fontWeight: 'bold' }}>
                          {getActionLabel(m.navigationAction)}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>

                {m.time && (
                  <Text style={{
                    color: colors.textSecondary, fontSize: 9,
                    marginTop: 3,
                    textAlign: m.role === 'user' ? 'right' : 'left',
                    marginHorizontal: 4,
                  }}>
                    {m.time}
                  </Text>
                )}
              </View>
            </View>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <View style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'flex-start' }}>
              <View style={{
                width: 32, height: 32, borderRadius: 16,
                backgroundColor: colors.primary,
                alignItems: 'center', justifyContent: 'center',
                marginRight: 8, alignSelf: 'flex-end',
              }}>
                <Bot size={16} color="#fff" />
              </View>
              <View style={{
                borderRadius: 20, borderBottomLeftRadius: 4,
                paddingHorizontal: 16, paddingVertical: 14,
                backgroundColor: colors.surface,
                shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
              }}>
                <TypingDots color={colors.primary} />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input bar */}
        <View style={{
          paddingHorizontal: 12, paddingVertical: 10,
          borderTopWidth: 1, borderTopColor: colors.border,
          backgroundColor: colors.surface,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>

            {/* Mic button */}
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {isRecording && <PulseRing color={colors.primary} />}
              <TouchableOpacity
                onPress={handleMic}
                disabled={isLoading}
                style={{
                  width: 44, height: 44, borderRadius: 22,
                  backgroundColor: isRecording ? colors.primary : colors.primaryLight,
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                {isRecording
                  ? <Square size={18} color="#fff" fill="#fff" />
                  : <Mic size={18} color={colors.primary} />}
              </TouchableOpacity>
            </View>

            {/* Text input */}
            <View style={{
              flex: 1, flexDirection: 'row', alignItems: 'center',
              borderRadius: 24, borderWidth: 1.5,
              borderColor: input.trim() ? colors.primary : colors.border,
              backgroundColor: colors.background,
              paddingHorizontal: 14,
            }}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder={isRecording ? '🔴 Recording... tap ■ to stop' : 'Ask me anything...'}
                placeholderTextColor={isRecording ? colors.primary : colors.textSecondary}
                style={{ flex: 1, fontSize: 14, paddingVertical: 10, color: colors.text }}
                onSubmitEditing={() => handleSend()}
                returnKeyType="send"
                multiline={false}
                editable={!isRecording}
              />
            </View>

            {/* Send button */}
            <TouchableOpacity
              onPress={() => handleSend()}
              disabled={isLoading || !input.trim()}
              style={{
                width: 44, height: 44, borderRadius: 22,
                backgroundColor: input.trim() ? colors.primary : colors.border,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              {isLoading
                ? <ActivityIndicator size="small" color="#fff" />
                : <Send size={18} color="#fff" />}
            </TouchableOpacity>
          </View>

          <Text style={{
            color: colors.textSecondary, fontSize: 9,
            textAlign: 'center', marginTop: 6,
            textTransform: 'uppercase', letterSpacing: 1,
          }}>
            🇷🇼 Kinyarwanda & English · Voice & Text
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AIAssistantScreen;
