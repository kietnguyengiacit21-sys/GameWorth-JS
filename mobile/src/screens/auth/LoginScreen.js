import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
import {login as loginRequest} from '../../services/authApi';
import {setCredentials} from '../../features/auth/authSlice';

function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await loginRequest({
        email: email.trim().toLowerCase(),
        password,
      });

      dispatch(setCredentials(response));
      navigation.reset({
        index: 0,
        routes: [{name: 'MainTabs'}],
      });
    } catch (err) {
      setError(err.message || 'Unable to login. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>Use your email and password to access your GameWorth account.</Text>
        </View>

        <View style={styles.form}>
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
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotLink}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <PrimaryButton
            title={loading ? 'Signing in...' : 'Login'}
            onPress={handleLogin}
            disabled={loading}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}> Create one</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: colors.background},
  container: {flex: 1, justifyContent: 'space-between', padding: 24},
  header: {marginTop: 24},
  title: {color: colors.primary, fontSize: 32, fontWeight: '900'},
  subtitle: {marginTop: 10, color: colors.textMuted, fontSize: 15, lineHeight: 22},
  form: {marginTop: 30},
  forgotLink: {alignSelf: 'flex-end', marginBottom: 16},
  forgotText: {color: colors.primary, fontWeight: '700'},
  footer: {flexDirection: 'row', justifyContent: 'center', marginTop: 24},
  footerText: {color: colors.textMuted},
  footerLink: {color: colors.primary, fontWeight: '800'},
  errorText: {
    color: colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
