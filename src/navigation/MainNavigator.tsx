import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Ticket, MapPin, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import colors from '../theme/colors';

// Screens
import HomeScreen from '../screens/HomeScreen';
import TicketsScreen from '../screens/TicketsScreen';
import LiveBusTrackerScreen from '../screens/LiveBusTrackerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import LanguageScreen from '../screens/LanguageScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 4,
        },
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 6,
          height: 68,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="TicketsTab"
        component={TicketsScreen}
        options={{
          tabBarLabel: t('tickets'),
          tabBarIcon: ({ color, size }) => <Ticket size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="TrackTab"
        component={LiveBusTrackerScreen}
        options={{
          tabBarLabel: t('track'),
          tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{ title: t('notifications') }} 
      />
      <Stack.Screen 
        name="BookingHistory" 
        component={BookingHistoryScreen} 
        options={{ title: 'Booking History' }} 
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: t('edit_profile') }} 
      />
      <Stack.Screen 
        name="PersonalInformation" 
        component={PersonalInformationScreen} 
        options={{ title: t('personal_info') }} 
      />
      <Stack.Screen 
        name="PaymentMethods" 
        component={PaymentMethodsScreen} 
        options={{ title: t('payment_methods') }} 
      />
      <Stack.Screen 
        name="Language" 
        component={LanguageScreen} 
        options={{ title: t('language') }} 
      />
      <Stack.Screen 
        name="HelpCenter" 
        component={HelpCenterScreen} 
        options={{ title: t('help_center') }} 
      />
      <Stack.Screen 
        name="PrivacyPolicy" 
        component={PrivacyPolicyScreen} 
        options={{ title: t('privacy_policy') }} 
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
