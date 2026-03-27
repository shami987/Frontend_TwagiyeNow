import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors, fonts} from '../theme';

const OpeningScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 150,
  },
  button: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  buttonText: {
    ...fonts.body,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default OpeningScreen;
