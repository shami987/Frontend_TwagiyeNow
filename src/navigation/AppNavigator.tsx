import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Ticket, User} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import OpeningScreen from '../screens/OpeningScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LiveBusTrackerScreen from '../screens/LiveBusTrackerScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import BusSearchResultsScreen from '../screens/BusSearchResultsScreen';
import BusDetailsScreen from '../screens/BusDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TicketsScreen from '../screens/TicketsScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import LanguageScreen from '../screens/LanguageScreen';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';
import PrivateCarBookingScreen from '../screens/PrivateCarBookingScreen';
import BusParkFeatureScreen from '../screens/BusParkFeatureScreen';
import {useTheme} from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          if (route.name === 'MainHome') return <Home color={color} size={size} />;
          if (route.name === 'MyTickets') return <Ticket color={color} size={size} />;
          if (route.name === 'UserProfile') return <User color={color} size={size} />;
          return null;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 60 + (insets.bottom > 0 ? insets.bottom - 10 : 0),
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
        },
      })}>
      <Tab.Screen name="MainHome" component={HomeScreen} options={{tabBarLabel: 'Home'}} />
      <Tab.Screen name="MyTickets" component={TicketsScreen} options={{tabBarLabel: 'Tickets'}} />
      <Tab.Screen name="UserProfile" component={ProfileScreen} options={{tabBarLabel: 'Profile'}} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Opening">
        <Stack.Screen name="Opening" component={OpeningScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="BusSearchResults" component={BusSearchResultsScreen} />
        <Stack.Screen name="BusDetails" component={BusDetailsScreen} />
        <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="AIAssistant" component={AIAssistantScreen} />
        <Stack.Screen name="PrivateCarBooking" component={PrivateCarBookingScreen} />
        <Stack.Screen name="BusParkFeature" component={BusParkFeatureScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
