import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, fonts} from '../theme';

const OnboardingScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoText}>
        <Text style={styles.bus}>Twagiye</Text>
        <Text style={styles.ticketing}>Now</Text>
      </View>
      <Image source={require('../assets/images/onboarding.png')} style={styles.illustration} resizeMode="contain" />
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>
        TwagiyeNow app is a online booking service for bus transportation. Login or Sign Up now to use this service.
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoText: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  bus: {
    ...fonts.h1,
    color: colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
  },
  ticketing: {
    ...fonts.h1,
    color: colors.secondary,
    fontSize: 28,
    fontWeight: 'bold',
  },
  illustration: {
    width: '100%',
    height: 220,
    marginBottom: 24,
  },
  title: {
    ...fonts.h1,
    color: colors.black,
    marginBottom: 12,
  },
  subtitle: {
    ...fonts.body,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
    position: 'absolute',
    bottom: 40,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    ...fonts.body,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
