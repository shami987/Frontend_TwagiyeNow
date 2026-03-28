import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts} from '../theme';

const SignupScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity className="absolute top-2.5 right-5 p-2.5 z-10" onPress={() => navigation.navigate('Home')}>
        <Text className="text-base font-bold" style={{ color: colors.primary }}>Skip</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 40 }} showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>Create Account</Text>
        <Text className="text-base mb-8" style={{ color: colors.gray }}>Sign up to get started</Text>

        <TextInput
          className="w-full border-[1.5px] rounded-xl py-3.5 px-4 mb-4 text-base"
          style={{ borderColor: colors.primary, color: colors.black }}
          placeholder="Full Name"
          placeholderTextColor={colors.gray}
          value={name}
          onChangeText={setName}
        />
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
          placeholder="Phone Number"
          placeholderTextColor={colors.gray}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
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
        <TextInput
          className="w-full border-[1.5px] rounded-xl py-3.5 px-4 mb-4 text-base"
          style={{ borderColor: colors.primary, color: colors.black }}
          placeholder="Confirm Password"
          placeholderTextColor={colors.gray}
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />

        <TouchableOpacity className="w-full py-4 rounded-[30px] items-center mt-2 mb-6" style={{ backgroundColor: colors.primary }}>
          <Text className="text-white text-base font-bold">Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-base" style={{ color: colors.gray }}>
            Already have an account? <Text className="font-bold" style={{ color: colors.primary }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
