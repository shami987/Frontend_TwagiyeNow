import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors, fonts} from '../theme';

const OpeningScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logoo.png')} style={styles.logo} resizeMode="contain" />
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
    width: 260,
    height: 260,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 8,
  },
  namePrimary: {
    color: colors.primary,
  },
  nameLight: {
    color: colors.primaryLight,
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
