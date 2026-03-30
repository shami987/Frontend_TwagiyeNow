import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Trash2, Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import ProfileAvatar from '../components/ProfileAvatar';

const EditProfileScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [name, setName] = useState('Jean Doe');
  const [email, setEmail] = useState('jean.doe@example.com');
  const [image, setImage] = useState<string | null>("https://i.pravatar.cc/150?u=jean");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSave = () => {
    Alert.alert(t('success'), t('profile_updated'));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageSection}>
          <ProfileAvatar name={name} imageUrl={image || undefined} size={120} />
          <View style={styles.imageButtons}>
            <TouchableOpacity style={[styles.imageButton, { backgroundColor: colors.primaryLight }]} onPress={pickImage}>
              <Camera size={20} color={colors.primary} />
              <Text style={[styles.imageButtonText, { color: colors.primary }]}>{t('change_photo')}</Text>
            </TouchableOpacity>
            {image && (
              <TouchableOpacity style={[styles.imageButton, styles.removeButton, { backgroundColor: colors.error + '20' }]} onPress={removeImage}>
                <Trash2 size={20} color={colors.error} />
                <Text style={[styles.imageButtonText, styles.removeButtonText, { color: colors.error }]}>{t('remove_photo')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('full_name')}</Text>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }]}
              value={name}
              onChangeText={setName}
              placeholder={t('full_name')}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('email')}</Text>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }]}
              value={email}
              onChangeText={setEmail}
              placeholder={t('email')}
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary, shadowColor: colors.primary }]} onPress={handleSave}>
          <Check size={20} color={colors.white} />
          <Text style={[styles.saveButtonText, { color: colors.white }]}>{t('save')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  imageButtonText: {
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  removeButton: {
    // Background color set dynamically
  },
  removeButtonText: {
    // Color set dynamically
  },
  formSection: {
    width: '100%',
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  saveButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default EditProfileScreen;
