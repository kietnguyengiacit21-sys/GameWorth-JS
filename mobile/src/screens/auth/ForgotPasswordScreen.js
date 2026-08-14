import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import {colors} from '../../theme/colors';
import {forgotPassword, resetPassword} from '../../services/authApi';

function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  async function handleSendLink() {
    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await forgotPassword({
        email: email.trim().toLowerCase(),
      });

      setResetToken(response.resetToken || '');
      setShowResetForm(true);
      setMessage(response.message || 'Reset instructions have been sent to your email.');
    } catch (err) {
      setError(err.message || 'Unable to send reset instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePassword() {
    setError('');
    setMessage('');

    if (!password) {
      setError('Please enter your new password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!resetToken) {
      setError('No reset token available. Please check your email for the reset link.');
      return;
    }

    setSaving(true);

    try {
      const response = await resetPassword({
        token: resetToken,
        password,
      });

      const successMessage = response.message || 'Your password has been changed successfully.';
      setMessage(successMessage);
      setPassword('');
      setConfirmPassword('');
      setShowResetForm(false);
      setResetToken('');

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }, 1200);
    } catch (err) {
      setError(err.message || 'Unable to reset password. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Text style={styles.title}>Forgot password</Text>
          <Text style={styles.subtitle}>Enter the email address linked to your account and we’ll send reset instructions.</Text>
        </View>

        <View style={styles.form}>
          <FormInput
            label="Email address"
            placeholder="hello@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!showResetForm}
          />

          {!!error && <Text style={styles.errorText}>{error}</Text>}
          {!!message && <Text style={styles.messageText}>{message}</Text>}

          {!showResetForm ? (
            <PrimaryButton
              title={loading ? 'Sending...' : 'Send reset link'}
              onPress={handleSendLink}
              disabled={loading}
            />
          ) : (
            <>
              <FormInput
                label="New password"
                placeholder="Enter new password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <FormInput
                label="Confirm new password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              {!!resetToken && (
                <Text style={styles.tokenText}>Reset token is ready for saving.</Text>
              )}

              <PrimaryButton
                title={saving ? 'Saving...' : 'Save new password'}
                onPress={handleSavePassword}
                disabled={saving}
              />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: colors.background},
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {marginTop: 0},
  title: {color: colors.primary, fontSize: 32, fontWeight: '900'},
  subtitle: {marginTop: 10, color: colors.textMuted, fontSize: 15, lineHeight: 22},
  form: {marginTop: 30, width: '100%'},
  errorText: {
    color: colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  messageText: {
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
