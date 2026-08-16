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
import {useDispatch} from 'react-redux';

import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import {colors} from '../../theme/colors';
import {register as registerRequest} from '../../services/authApi';
import {setCredentials} from '../../features/auth/authSlice';

function RegisterScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setError('');

    if (!displayName.trim() || !email.trim() || !password || !confirmPassword) {
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
        email: email.trim().toLowerCase(),
        password,
      });

      dispatch(setCredentials(response));
      navigation.reset({
        index: 0,
        routes: [{name: 'MainTabs'}],
      });
    } catch (err) {
      setError(err.message || 'Unable to register. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Join GameWorth and manage your games, ratings, and wishlist in one place.</Text>
        </View>

        <View style={styles.form}>
          <FormInput
            label="Full name"
            placeholder="John Doe"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
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
            secureTextEntry
          />
          <FormInput
            label="Confirm password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <PrimaryButton
            title={loading ? 'Creating account...' : 'Register'}
            onPress={handleRegister}
            disabled={loading}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Text onPress={() => navigation.navigate('Login')} style={styles.footerLink}> Login</Text>
          </View>
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
  footer: {flexDirection: 'row', justifyContent: 'center', marginTop: 24},
  footerText: {color: colors.textMuted},
  footerLink: {color: colors.primary, fontWeight: '800'},
  errorText: {
    color: colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default RegisterScreen;
