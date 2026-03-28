import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import { Search, Navigation, MapPin, Bus, Clock, ChevronRight, X } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Dummy Rwandan bus data
const DUMMY_BUSES = [
  { id: '1', number: 'RITCO 102', route: 'Nyabugogo - Musanze', lat: -1.9441, lng: 30.0619, status: 'On Time', speed: '65 km/h', eta: '15 mins' },
  { id: '2', number: 'VIRUNGA 205', route: 'Nyabugogo - Rubavu', lat: -1.9501, lng: 30.0589, status: 'Delayed', speed: '45 km/h', eta: '45 mins' },
  { id: '3', number: 'HORIZON 310', route: 'Nyabugogo - Huye', lat: -1.9391, lng: 30.0659, status: 'On Time', speed: '70 km/h', eta: '10 mins' },
];

const LiveBusTrackerScreen = () => {
  const { colors } = useTheme();
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const webViewRef = useRef<WebView>(null);
  const slideAnim = useRef(new Animated.Value(height)).current;

  // Leaflet HTML template
  const leafletHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; }
        #map { height: 100vh; width: 100vw; }
        .bus-marker {
          background-color: ${colors.primary};
          border: 2px solid white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', { zoomControl: false }).setView([-1.9441, 30.0619], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        var buses = ${JSON.stringify(DUMMY_BUSES)};
        var markers = {};

        buses.forEach(function(bus) {
          var icon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div class='bus-marker'>" + bus.number.split(' ')[1] + "</div>",
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          var marker = L.marker([bus.lat, bus.lng], { icon: icon }).addTo(map);
          marker.on('click', function() {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'BUS_CLICKED', busId: bus.id }));
          });
          markers[bus.id] = marker;
        });

        // Function to move bus randomly (simulating live movement)
        function updateBusPositions() {
          buses.forEach(function(bus) {
            bus.lat += (Math.random() - 0.5) * 0.0005;
            bus.lng += (Math.random() - 0.5) * 0.0005;
            markers[bus.id].setLatLng([bus.lat, bus.lng]);
          });
          setTimeout(updateBusPositions, 3000);
        }
        updateBusPositions();

        window.addEventListener('message', function(event) {
          var data = JSON.parse(event.data);
          if (data.type === 'CENTER_ON_BUS') {
            var bus = buses.find(b => b.id === data.busId);
            if (bus) {
              map.setView([bus.lat, bus.lng], 16, { animate: true });
            }
          }
        });
      </script>
    </body>
    </html>
  `;

  const onMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'BUS_CLICKED') {
      const bus = DUMMY_BUSES.find(b => b.id === data.busId);
      setSelectedBus(bus);
      Animated.spring(slideAnim, {
        toValue: height - 280,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeDetails = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSelectedBus(null));
  };

  const centerOnBus = (busId: string) => {
    webViewRef.current?.postMessage(JSON.stringify({ type: 'CENTER_ON_BUS', busId }));
  };

  return (
    <View className="flex-1">
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: leafletHtml }}
        onMessage={onMessage}
        className="flex-1"
      />

      {/* Floating Header Search */}
      <SafeAreaView className="absolute top-0 left-0 right-0 z-10 px-5">
        <View className="flex-row items-center rounded-2xl px-4 py-3 shadow-lg" style={{ backgroundColor: colors.surface }}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search bus number or route..."
            placeholderTextColor={colors.textSecondary}
            className="flex-1 text-sm ml-2.5 p-0"
            style={{ color: colors.text }}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity className="p-2 rounded-xl" style={{ backgroundColor: colors.primary }}>
            <Navigation size={18} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Selected Bus Info Card */}
      <Animated.View 
        className="absolute left-0 right-0 bottom-0 h-[300px] rounded-t-[30px] p-6 shadow-2xl"
        style={[{ backgroundColor: colors.surface, transform: [{ translateY: slideAnim }] }]}
      >
        {selectedBus && (
          <>
            <View className="flex-row justify-between items-start mb-5">
              <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-2xl items-center justify-center mr-4" style={{ backgroundColor: colors.primaryLight }}>
                  <Bus size={24} color={colors.primary} />
                </View>
                <View>
                  <Text className="text-lg font-bold" style={{ color: colors.text }}>{selectedBus.number}</Text>
                  <Text className="text-sm" style={{ color: colors.textSecondary }}>{selectedBus.route}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={closeDetails} className="p-1">
                <X size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View className="h-[1px] bg-gray-100 mb-5" />

            <View className="flex-row justify-between mb-6">
              <View className="items-center flex-1">
                <Clock size={16} color={colors.primary} />
                <Text className="text-base font-bold my-1" style={{ color: colors.text }}>{selectedBus.eta}</Text>
                <Text className="text-xs" style={{ color: colors.textSecondary }}>ETA</Text>
              </View>
              <View className="items-center flex-1">
                <Navigation size={16} color={colors.primary} />
                <Text className="text-base font-bold my-1" style={{ color: colors.text }}>{selectedBus.speed}</Text>
                <Text className="text-xs" style={{ color: colors.textSecondary }}>Speed</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-2 h-2 rounded-full mb-2" style={{ backgroundColor: selectedBus.status === 'On Time' ? '#4CAF50' : '#FFC107' }} />
                <Text className="text-base font-bold my-1" style={{ color: colors.text }}>{selectedBus.status}</Text>
                <Text className="text-xs" style={{ color: colors.textSecondary }}>Status</Text>
              </View>
            </View>

            <TouchableOpacity 
              className="flex-row items-center justify-center py-4 rounded-2xl"
              style={{ backgroundColor: colors.primary }}
              onPress={() => centerOnBus(selectedBus.id)}
            >
              <Text className="text-white text-base font-bold mr-2.5">Track this bus</Text>
              <ChevronRight size={20} color="white" />
            </TouchableOpacity>
          </>
        )}
      </Animated.View>

      {/* Floating Action Buttons */}
      <View className="absolute right-5 bottom-[320px] z-[5]">
        <TouchableOpacity 
          className="w-14 h-14 rounded-full items-center justify-center shadow-lg"
          style={{ backgroundColor: colors.surface }}
          onPress={() => webViewRef.current?.reload()}
        >
          <MapPin size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LiveBusTrackerScreen;