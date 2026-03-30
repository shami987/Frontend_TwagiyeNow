import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../theme';
import {authApi} from '../api/auth';
import {saveToken, saveUser} from '../services/storage';

const SignupScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async () => {
    setError('');
    setSuccess('');
    if (!name || !email || !password || !confirm)
      return setError('Please fill in all fields');
    if (password !== confirm)
      return setError('Passwords do not match');

    setLoading(true);
    try {
      const res = await authApi.signup({ name, email, password });
      await saveToken(res.data.token);
      await saveUser(res.data.user);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigation.replace('Login'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity className="absolute top-2.5 right-5 p-2.5 z-10" onPress={() => navigation.navigate('Home')}>
        <Text className="text-base font-bold" style={{color: colors.primary}}>Skip</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 40}} showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold mb-1" style={{color: colors.primary}}>Create Account</Text>
        <Text className="text-base mb-8" style={{color: colors.gray}}>Sign up to get started</Text>

        {/* Error message */}
        {error ? (
          <View className="w-full bg-red-50 border border-red-300 rounded-xl px-4 py-3 mb-4">
            <Text className="text-red-600 text-sm text-center">{error}</Text>
          </View>
        ) : null}

        {/* Success message */}
        {success ? (
          <View className="w-full bg-green-50 border border-green-300 rounded-xl px-4 py-3 mb-4">
            <Text className="text-green-600 text-sm text-center">{success}</Text>
          </View>
        ) : null}

        <TextInput
          className="w-full border-[1.5px] rounded-xl py-3.5 px-4 mb-4 text-base"
          style={{borderColor: colors.primary, color: colors.black}}
          placeholder="Full Name"
          placeholderTextColor={colors.gray}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="w-full border-[1.5px] rounded-xl py-3.5 px-4 mb-4 text-base"
          style={{borderColor: colors.primary, color: colors.black}}
          placeholder="Email"
          placeholderTextColor={colors.gray}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full border-[1.5px] rounded-xl py-3.5 px-4 mb-4 text-base"
          style={{borderColor: colors.primary, color: colors.black}}
          placeholder="Password"
          placeholderTextColor={colors.gray}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="w-full border-[1.5px] rounded-xl py-3.5 px-4 mb-4 text-base"
          style={{borderColor: colors.primary, color: colors.black}}
          placeholder="Confirm Password"
          placeholderTextColor={colors.gray}
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />

        <TouchableOpacity
          className="w-full py-4 rounded-[30px] items-center mt-2 mb-6"
          style={{backgroundColor: colors.primary}}
          onPress={handleSignup}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-bold">Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-base" style={{color: colors.gray}}>
            Already have an account? <Text className="font-bold" style={{color: colors.primary}}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
