import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import {
  register as registerRequest,
  verifyRegistration,
} from '../../services/authApi';
import { setCredentials } from '../../features/auth/authSlice';

function RegisterScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function openLogin() {
    navigation.navigate('Login');
  }

  function editRegistration() {
    setVerificationSent(false);
    setVerificationCode('');
    setError('');
  }

  async function handleRegister() {
    setError('');

    if (verificationSent) {
      if (!/^\d{6}$/.test(verificationCode)) {
        setError('Please enter the 6-digit code from your email.');
        return;
      }

      setLoading(true);

      try {
        const response = await verifyRegistration({
          email: email.trim().toLowerCase(),
          code: verificationCode,
        });

        dispatch(setCredentials(response));
        Alert.alert('Registration successful', 'Your GameWorth account is ready.');
        navigation.reset({
          index: 0,
          routes: [{name: 'MainTabs'}],
        });
      } catch (err) {
        setError(err?.message || 'Unable to verify your email. Please try again.');
      } finally {
        setLoading(false);
      }

      return;
    }

    if (
      !displayName.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const response = await registerRequest({
        displayName: displayName.trim(),
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      });

      setVerificationSent(true);

      if (response?.verificationCode) {
        setError(`Development code: ${response.verificationCode}`);
      }
    } catch (err) {
      let message = 'Unable to register. Please try again.';

      if (err != null && err.message != null) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  let buttonTitle = 'Register';

  if (loading && verificationSent) {
    buttonTitle = 'Verifying...';
  } else if (loading) {
    buttonTitle = 'Sending code...';
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            Create account
          </Text>

          <Text style={styles.subtitle}>
            Join GameWorth to discover games and share your reviews.
          </Text>
        </View>

        <View style={styles.form}>
          {verificationSent ? (
            <>
              <Text style={styles.verificationText}>
                We sent a 6-digit verification code to {email}.
              </Text>

              <FormInput
                label="Verification code"
                placeholder="123456"
                value={verificationCode}
                onChangeText={value => setVerificationCode(value.replace(/\D/g, '').slice(0, 6))}
                keyboardType="number-pad"
                maxLength={6}
                autoCapitalize="none"
              />
            </>
          ) : (
            <>
              <FormInput
                label="Display name"
                placeholder="John Doe"
                value={displayName}
                onChangeText={setDisplayName}
                autoCapitalize="words"
              />

              <FormInput
                label="Username"
                placeholder="gameworthfan"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />

              <FormInput
                label="Email"
                placeholder="hello@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <FormInput
                label="Password"
                placeholder="Create password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />

              <FormInput
                label="Confirm password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
              />
            </>
          )}

          {error !== '' && (
            <Text style={styles.errorText}>
              {error}
            </Text>
          )}

          <PrimaryButton
            title={buttonTitle}
            onPress={handleRegister}
            disabled={loading}
          />

          {verificationSent && (
            <Text onPress={editRegistration} style={styles.footerLink}>
              Change registration details
            </Text>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>

            <Text
              onPress={openLogin}
              style={styles.footerLink}
            >
              {' '}Login
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  header: {
    marginTop: 0,
  },

  title: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: '900',
  },

  subtitle: {
    marginTop: 10,
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },

  form: {
    width: '100%',
    marginTop: 30,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },

  footerText: {
    color: colors.textMuted,
  },

  footerLink: {
    color: colors.primary,
    fontWeight: '800',
  },

  errorText: {
    marginBottom: 16,
    color: colors.error,
    textAlign: 'center',
  },

  verificationText: {
    marginBottom: 20,
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});

export default RegisterScreen;