import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import {colors, fonts} from '../theme';
import {authApi} from '../api/auth';

const ForgotPasswordScreen = ({navigation}: any) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    setError('');
    if (!email) return setError('Please enter your email');
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    if (!otp) return setError('Please enter the OTP');
    setLoading(true);
    try {
      await authApi.verifyOtp(email, otp);
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError('');
    if (!password || !confirm) return setError('Please fill in all fields');
    if (password !== confirm) return setError('Passwords do not match');
    setLoading(true);
    try {
      await authApi.resetPassword(email, otp, password);
      navigation.replace('Login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Step indicator */}
      <View style={styles.steps}>
        {[1, 2, 3].map(s => (
          <View key={s} style={[styles.dot, step >= s && styles.dotActive]} />
        ))}
      </View>

      {/* Inline error */}
      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Step 1 — Email */}
      {step === 1 && (
        <>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>Enter your email and we'll send you a verification code.</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={colors.gray}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendOtp} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Code</Text>}
          </TouchableOpacity>
        </>
      )}

      {/* Step 2 — OTP */}
      {step === 2 && (
        <>
          <Text style={styles.title}>Enter Code</Text>
          <Text style={styles.subtitle}>We sent a 6-digit code to {email}.</Text>
          <TextInput
            style={[styles.input, styles.otpInput]}
            placeholder="------"
            placeholderTextColor={colors.gray}
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify Code</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendOtp}>
            <Text style={styles.link}>Didn't receive it? <Text style={styles.linkBold}>Resend</Text></Text>
          </TouchableOpacity>
        </>
      )}

      {/* Step 3 — New password */}
      {step === 3 && (
        <>
          <Text style={styles.title}>New Password</Text>
          <Text style={styles.subtitle}>Create a strong new password for your account.</Text>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor={colors.gray}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={colors.gray}
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Reset Password</Text>}
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Back to <Text style={styles.linkBold}>Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  steps: { flexDirection: 'row', gap: 8, marginBottom: 32 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.lightGray },
  dotActive: { backgroundColor: colors.primary, width: 28 },
  errorBox: { width: '100%', backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FCA5A5', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 16 },
  errorText: { color: '#DC2626', fontSize: 14, textAlign: 'center' },
  title: { ...fonts.h1, color: colors.primary, marginBottom: 8, textAlign: 'center' },
  subtitle: { ...fonts.body, color: colors.gray, textAlign: 'center', marginBottom: 32, lineHeight: 22 },
  input: { width: '100%', borderWidth: 1.5, borderColor: colors.primary, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16, marginBottom: 16, ...fonts.body, color: colors.black },
  otpInput: { textAlign: 'center', fontSize: 24, letterSpacing: 12 },
  button: { width: '100%', backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 20 },
  buttonText: { ...fonts.body, color: colors.white, fontWeight: 'bold' },
  link: { ...fonts.body, color: colors.gray, marginTop: 8 },
  linkBold: { color: colors.primary, fontWeight: 'bold' },
});

export default ForgotPasswordScreen;
