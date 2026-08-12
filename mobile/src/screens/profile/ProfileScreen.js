import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';

import {logout} from '../../features/auth/authSlice';
import {colors} from '../../theme/colors';
import PrimaryButton from '../../components/PrimaryButton';

function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user) || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.profileCard}>
        {user.avatarUrl ? (
          <Image source={{uri: user.avatarUrl}} style={styles.avatar} />
        ) : null}
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>PROFILE</Text>
        </View>
        <Text style={styles.title}>{user.displayName || 'Guest Player'}</Text>
        <Text style={styles.email}>{user.email || 'guest@gameworth.app'}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>28</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>14</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        <PrimaryButton title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} style={styles.actionButton} />
        <Pressable onPress={() => dispatch(logout())} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: colors.background, padding: 24},
  profileCard: {
    marginTop: 24,
    borderRadius: 24,
    padding: 26,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: colors.surfaceHigh,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badge: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 18,
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  email: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 15,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 18,
    alignSelf: 'center',
    backgroundColor: colors.surfaceHigh,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  statLabel: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 12,
  },
  actionButton: {
    marginTop: 24,
  },
  logoutButton: {
    marginTop: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.primary,
    fontWeight: '800',
  },
});

export default ProfileScreen;
