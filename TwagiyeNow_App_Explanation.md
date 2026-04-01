# TwagiyeNow - Smart Bus Transportation App

## Overview
TwagiyeNow is a comprehensive mobile application designed for bus transportation booking and tracking in Rwanda. The app provides users with an intelligent, user-friendly platform to book bus tickets, track live bus locations, and manage their travel experience seamlessly.

## Core Features & How They Work

### 1. **Smart Onboarding & Authentication**
- **Opening Screen**: App launches with brand introduction
- **Onboarding**: Welcome screen explaining the service
- **Login/Signup**: Secure user authentication system
- **Password Recovery**: Forgot password functionality

### 2. **Home Dashboard - Central Hub**
The home screen serves as the main control center:

#### Quick Actions
- **AI Trip Planner**: Tap to access AI assistant for travel planning
- **Private Car Booking**: Premium ride booking service
- **Bus Park Assistant**: Location-based bus finding when you're at a bus park

#### Journey Planning Interface
- **From/To Selection**: Interactive input fields for departure and destination
- **Date & Time Picker**: Schedule your travel
- **Passenger Count**: Specify number of travelers
- **Route Visualization**: Visual journey representation with icons

#### Active Ticket Display
- Shows current active bookings
- Real-time tracking button for live bus location
- Quick access to ticket details

### 3. **Bus Park Feature - Location Intelligence**
This innovative feature helps users when they're physically at a bus park:

#### How It Works:
1. **Location Detection**: Uses GPS to detect user's current location
2. **Geocoding**: Converts coordinates to readable address using OpenStreetMap API
3. **Route Mapping**: Displays live route view using Google Maps WebView
4. **Bus Information**: Shows relevant bus details for the detected location
5. **Real-time Updates**: Provides live information about buses at that specific park

#### Technical Implementation:
- Uses Nominatim API for reverse geocoding
- Integrates Google Maps for route visualization
- Hardcoded coordinates for Nyabugogo (demo purposes)
- Real-time location name and route number display

### 4. **Bus Search & Booking System**

#### Search Process:
1. **Route Input**: Enter departure and destination
2. **Filter Options**: Date, time, passenger count
3. **Results Display**: Shows available buses with:
   - Company name and bus number
   - Departure/arrival times
   - Price and availability status
   - Distance and journey duration

#### Bus Information Cards:
- **Company Details**: Bus operator information
- **Availability Status**: Real-time seat availability
- **Journey Timeline**: Visual departure to arrival flow
- **Pricing**: Clear fare display in RWF

### 5. **Live Bus Tracking System**
Advanced real-time tracking functionality:

#### Features:
- **Interactive Map**: Leaflet-based map with OpenStreetMap tiles
- **Live Bus Markers**: Real-time bus positions with custom icons
- **Bus Selection**: Tap any bus marker for detailed information
- **Movement Simulation**: Buses move in real-time on the map
- **Search Functionality**: Find specific buses by number or route

#### Technical Implementation:
- Uses Leaflet.js for mapping
- WebView integration for map display
- Real-time position updates every 3 seconds
- Custom bus markers with company identification
- Animated slide-up panels for bus details

### 6. **AI Assistant Integration**
Smart travel planning assistant:
- **Natural Language Processing**: Users can describe their travel needs
- **Trip Recommendations**: AI suggests optimal routes and times
- **Travel Planning**: Comprehensive journey organization
- **Interactive Chat**: Real-time conversation interface

### 7. **User Profile & Management**
Complete user account system:
- **Personal Information**: User details management
- **Booking History**: Past and upcoming trips
- **Payment Methods**: Secure payment options
- **Notifications**: Travel updates and alerts
- **Settings**: App preferences and language selection

### 8. **Navigation Structure**
The app uses a hybrid navigation system:

#### Bottom Tab Navigation:
- **Home**: Main dashboard
- **Tracker**: Live bus tracking
- **Tickets**: Booking management
- **Profile**: User account

#### Stack Navigation:
- Seamless screen transitions
- Deep linking capabilities
- Back navigation support

## Technical Architecture

### Frontend Technology Stack:
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **Expo**: Development and deployment platform
- **NativeWind**: Tailwind CSS for React Native styling
- **React Navigation**: Navigation management
- **Lucide React Native**: Icon library

### Key Libraries:
- **WebView**: Map integration and web content
- **Async Storage**: Local data persistence
- **Safe Area Context**: Screen layout management
- **Reanimated**: Smooth animations
- **i18next**: Internationalization support

### API Integrations:
- **OpenStreetMap/Nominatim**: Geocoding and reverse geocoding
- **Google Maps**: Route visualization and directions
- **Leaflet**: Interactive mapping functionality

## User Experience Flow

### Typical User Journey:
1. **App Launch** → Opening screen → Onboarding
2. **Authentication** → Login/Signup
3. **Home Dashboard** → View active tickets and quick actions
4. **Trip Planning** → Enter journey details
5. **Bus Search** → Browse available options
6. **Booking** → Select and book preferred bus
7. **Live Tracking** → Monitor bus location in real-time
8. **Trip Management** → Access tickets and booking history

### Special Features:
- **Bus Park Assistant**: Automatically detects when user is at a bus park
- **AI Integration**: Smart trip planning and recommendations
- **Real-time Updates**: Live bus positions and status
- **Multi-language Support**: Localization capabilities
- **Offline Capability**: Core features work without internet

## Data Management
- **Local Storage**: User preferences and cached data
- **State Management**: React hooks and context
- **Theme System**: Dynamic color schemes and styling
- **Error Handling**: Comprehensive error management

## Security & Privacy
- **Secure Authentication**: Protected user accounts
- **Data Encryption**: Sensitive information protection
- **Privacy Controls**: User data management options
- **Secure Payments**: Protected transaction processing

## Future Enhancements
The app architecture supports:
- **Real API Integration**: Backend service connectivity
- **Push Notifications**: Real-time alerts
- **Payment Gateway**: Multiple payment options
- **Advanced AI**: Enhanced trip planning
- **Social Features**: User reviews and ratings

TwagiyeNow represents a modern approach to public transportation management, combining location intelligence, real-time tracking, and AI assistance to create a seamless travel experience for users in Rwanda.