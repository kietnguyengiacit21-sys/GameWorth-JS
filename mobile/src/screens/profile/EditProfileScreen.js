import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import {colors} from '../../theme/colors';
import {setCredentials} from '../../features/auth/authSlice';
import {updateMe} from '../../services/userApi';

function EditProfileScreen() {
  const user = useSelector(state => state.auth.user) || {};
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.displayName || '');
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [bio, setBio] = useState(user.bio || '');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-clear success message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  async function handleSave() {
    setError('');
    setMessage('');

    if (!name.trim() || !email.trim()) {
      setError('Display name and email are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await updateMe(
        {
          displayName: name.trim(),
          username: username.trim() || null,
          email: email.trim().toLowerCase(),
          avatarUrl: avatarUrl.trim() || null,
          bio: bio.trim() || null,
        },
        token,
      );

      dispatch(setCredentials({token, user: {...user, ...response, avatarUrl: avatarUrl.trim() || null}}));
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.message || 'Unable to save profile.');
    } finally {
      setLoading(false);
    }
  }

  // Avatar upload via image picker removed — using Avatar URL input instead

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Text style={styles.title}>Edit profile</Text>
          <Text style={styles.subtitle}>Update your display name, email, and gaming status.</Text>
        </View>

        <View style={styles.form}>
          {!!avatarUrl ? (
            <Image source={{uri: avatarUrl}} style={styles.avatarPreview} />
          ) : null}
          {!!avatarUrl && <Text style={styles.photoLabel}>Avatar preview</Text>}
          <FormInput
            label="Avatar URL"
            value={avatarUrl}
            onChangeText={setAvatarUrl}
            placeholder="https://example.com/avatar.jpg"
            autoCapitalize="none"
          />
          <FormInput label="Display name" value={name} onChangeText={setName} placeholder="Game Worth" autoCapitalize="words" />
          <FormInput label="Username" value={username} onChangeText={setUsername} placeholder="gameworthfan" autoCapitalize="none" />
          <FormInput label="Email" value={email} onChangeText={setEmail} placeholder="hello@example.com" keyboardType="email-address" autoCapitalize="none" />
          <FormInput label="Bio" value={bio} onChangeText={setBio} placeholder="Avid action RPG player..." multiline numberOfLines={4} />

          <PrimaryButton title="Save changes" onPress={handleSave} />

          {!!error && <Text style={styles.errorText}>{error}</Text>}
          {!!message && <Text style={styles.messageText}>{message}</Text>}
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
  photoLabel: {color: colors.textMuted, marginTop: 12, marginBottom: 16, fontSize: 13},
  errorText: {color: colors.error, marginBottom: 16, textAlign: 'center'},
  messageText: {
    backgroundColor: colors.primary,
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  avatarPreview: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
    alignSelf: 'center',
    backgroundColor: colors.surfaceHigh,
  },
});

export default EditProfileScreen;
