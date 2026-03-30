import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts} from '../theme';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity className="absolute top-16 right-5 p-2.5 z-10" onPress={() => navigation.navigate('Home')}>
        <Text className="text-base font-bold" style={{ color: colors.primary }}>Skip</Text>
      </TouchableOpacity>
      <View className="flex-1 items-center justify-center px-7">
        <Text className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>Welcome Back</Text>
        <Text className="text-base mb-8" style={{ color: colors.gray }}>Login to your account</Text>

        <TextInput
          className="w-full border-[1.5px] rounded-xl py-3.5 px-4 mb-4 text-base"
          style={{ borderColor: colors.primary, color: colors.black }}
          placeholder="Email"
          placeholderTextColor={colors.gray}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full border-[1.5px] rounded-xl py-3.5 px-4 mb-4 text-base"
          style={{ borderColor: colors.primary, color: colors.black }}
          placeholder="Password"
          placeholderTextColor={colors.gray}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity className="w-full py-4 rounded-[30px] items-center mt-2 mb-6" style={{ backgroundColor: colors.primary }}>
          <Text className="text-white text-base font-bold">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text className="text-base mb-4" style={{ color: colors.gray }}>
            Forgot password? <Text className="font-bold" style={{ color: colors.primary }}>Reset</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text className="text-base" style={{ color: colors.gray }}>
            Don't have an account? <Text className="font-bold" style={{ color: colors.primary }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
