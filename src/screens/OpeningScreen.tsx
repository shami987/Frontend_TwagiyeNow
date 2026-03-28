import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {colors} from '../theme';

const OpeningScreen = ({navigation}: any) => {
  // Auto-navigate to Onboarding after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Onboarding'), 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logoo.png')} style={styles.logo} resizeMode="contain" />
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
});

export default OpeningScreen;
