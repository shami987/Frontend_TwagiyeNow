import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface ProfileAvatarProps {
  imageUrl?: string;
  name: string;
  size?: number;
  style?: ViewStyle;
}

const ProfileAvatar = ({ imageUrl, name, size = 80, style }: ProfileAvatarProps) => {
  const { colors } = useTheme();

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: colors.border }, style]}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={[styles.image, { borderRadius: size / 2 }]} 
        />
      ) : (
        <View style={[styles.fallback, { borderRadius: size / 2, backgroundColor: colors.primary }]}>
          <Text style={[styles.initials, { fontSize: size * 0.4, color: colors.white }]}>{initials}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontWeight: 'bold',
  },
});

export default ProfileAvatar;
