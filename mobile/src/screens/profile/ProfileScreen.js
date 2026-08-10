import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

import {colors} from '../../theme/colors';

function ProfileScreen() {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.name}>
          {user?.displayName || 'Guest User'}
        </Text>
        <Text style={styles.email}>
          {user?.email || 'Login API is not connected yet'}
        </Text>

        <Pressable
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },
  name: {
    marginTop: 12,
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
  },
  email: {
    marginTop: 6,
    color: colors.textMuted,
  },
  button: {
    marginTop: 24,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.surfaceHigh,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: '800',
  },
});

export default ProfileScreen;
