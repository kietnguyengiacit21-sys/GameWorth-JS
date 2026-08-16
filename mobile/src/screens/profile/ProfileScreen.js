import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import PrimaryButton from '../../components/PrimaryButton';
import {logout} from '../../features/auth/authSlice';
import {colors} from '../../theme/colors';


function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(function (state) {
    return state.auth.user;
  });

  let isGuest = false;

  if (user == null || user.id == null) {
    isGuest = true;
  }


  function openLogin() {
    navigation.navigate('Login');
  }


  function openRegister() {
    navigation.navigate('Register');
  }


  function openEditProfile() {
    navigation.navigate('EditProfile');
  }


  function handleLogout() {
    dispatch(logout());
  }


  function getMemberSince(value) {
    if (value == null || value === '') {
      return '';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }


  if (isGuest) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>
              GW
            </Text>
          </View>

          <Text style={styles.headerTitle}>
            Profile Overview
          </Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.guestContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.guestCard}>
            <View style={styles.guestAvatar}>
              <View style={styles.userHead} />
              <View style={styles.userBody} />
            </View>

            <Text style={styles.guestTitle}>
              Guest Player
            </Text>

            <Text style={styles.guestSubtitle}>
              Sign in to write reviews and manage your GameWorth profile.
            </Text>
          </View>

          <View style={styles.guestSpace} />

          <View style={styles.guestActions}>
            <PrimaryButton
              title="Log In"
              onPress={openLogin}
              style={styles.loginButton}
            />

            <Pressable
              onPress={openRegister}
              style={styles.registerButton}
            >
              <Text style={styles.registerText}>
                Register
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }


  let displayName = 'Player';

  if (user.displayName != null && user.displayName !== '') {
    displayName = user.displayName;
  }


  let username = 'Not set';

  if (user.username != null && user.username !== '') {
    username = user.username;
  }


  let email = 'Not set';

  if (user.email != null && user.email !== '') {
    email = user.email;
  }


  let bio = 'No bio yet.';

  if (user.bio != null && user.bio !== '') {
    bio = user.bio;
  }


  let reviewCount = 0;

  if (user.reviewCount != null) {
    reviewCount = Number(user.reviewCount);
  }


  let createdAt = null;

  if (user.createdAt != null) {
    createdAt = user.createdAt;
  } else if (user.created_at != null) {
    createdAt = user.created_at;
  }

  const memberSince = getMemberSince(createdAt);


  let usernameText = 'Not set';

  if (username !== 'Not set') {
    usernameText = '@' + username;
  }


  let avatarContent;

  if (user.avatarUrl != null && user.avatarUrl !== '') {
    avatarContent = (
      <Image
        source={{uri: user.avatarUrl}}
        style={styles.avatar}
      />
    );
  } else {
    let firstLetter = 'P';

    if (displayName !== '') {
      firstLetter = displayName.charAt(0).toUpperCase();
    }

    avatarContent = (
      <View style={styles.avatarFallback}>
        <Text style={styles.avatarLetter}>
          {firstLetter}
        </Text>
      </View>
    );
  }


  let memberSinceContent = null;

  if (memberSince !== '') {
    memberSinceContent = (
      <>
        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>
            MEMBER SINCE
          </Text>

          <Text style={styles.detailValue}>
            {memberSince}
          </Text>
        </View>
      </>
    );
  }


  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>
            GW
          </Text>
        </View>

        <Text style={styles.headerTitle}>
          Profile Overview
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.identityRow}>
            <View style={styles.avatarShell}>
              {avatarContent}
            </View>

            <View style={styles.identityInfo}>
              <View style={styles.badgeContainer}>
                <Text style={styles.badge}>
                  PROFILE
                </Text>
              </View>

              <Text
                style={styles.title}
                numberOfLines={1}
              >
                {displayName}
              </Text>

              <Text
                style={styles.username}
                numberOfLines={1}
              >
                {usernameText}
              </Text>
            </View>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.bioLabel}>
              BIO
            </Text>

            <Text style={styles.bio}>
              {bio}
            </Text>
          </View>
        </View>


        <Text style={styles.sectionTitle}>
          Account Details
        </Text>


        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              EMAIL
            </Text>

            <Text
              style={styles.detailValue}
              numberOfLines={1}
            >
              {email}
            </Text>
          </View>


          <View style={styles.divider} />


          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              REVIEWS
            </Text>

            <Text style={styles.detailValue}>
              {reviewCount}
            </Text>
          </View>


          {memberSinceContent}
        </View>


        <PrimaryButton
          title="Edit Profile"
          onPress={openEditProfile}
          style={styles.actionButton}
        />


        <Pressable
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>
            Log Out
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: colors.surface,
  },

  logoText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '900',
  },

  headerTitle: {
    marginLeft: 14,
    color: colors.text,
    fontSize: 21,
    fontWeight: '800',
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 40,
  },

  profileCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },

  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarShell: {
    width: 88,
    height: 88,
    borderWidth: 2,
    borderColor: 'rgba(78, 222, 163, 0.35)',
    borderRadius: 44,
    overflow: 'hidden',
  },

  avatar: {
    width: '100%',
    height: '100%',
  },

  avatarFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHigh,
  },

  avatarLetter: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '900',
  },

  identityInfo: {
    flex: 1,
    marginLeft: 16,
  },

  badgeContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.surfaceHigh,
  },

  badge: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },

  title: {
    marginTop: 10,
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },

  username: {
    marginTop: 5,
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },

  bioContainer: {
    marginTop: 18,
    padding: 16,
    borderRadius: 14,
    backgroundColor: colors.surfaceHigh,
  },

  bioLabel: {
    marginBottom: 8,
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },

  bio: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
  },

  sectionTitle: {
    marginTop: 26,
    marginBottom: 12,
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },

  detailsCard: {
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },

  detailRow: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  detailLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.7,
  },

  detailValue: {
    flex: 1,
    marginLeft: 25,
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },

  actionButton: {
    width: '100%',
    marginTop: 26,
    borderRadius: 14,
  },

  logoutButton: {
    alignSelf: 'center',
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  logoutText: {
    color: '#FFB4AB',
    fontSize: 15,
    fontWeight: '800',
  },

  guestContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 35,
  },

  guestCard: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.surface,
  },

  guestAvatar: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(78, 222, 163, 0.35)',
    borderRadius: 55,
    backgroundColor: colors.surfaceHigh,
  },

  userHead: {
    position: 'absolute',
    top: 22,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.textMuted,
  },

  userBody: {
    position: 'absolute',
    bottom: 19,
    width: 58,
    height: 38,
    borderRadius: 24,
    backgroundColor: colors.textMuted,
  },

  guestTitle: {
    marginTop: 20,
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
  },

  guestSubtitle: {
    maxWidth: 300,
    marginTop: 10,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },

  guestSpace: {
    flex: 1,
    minHeight: 70,
  },

  guestActions: {
    width: '100%',
  },

  loginButton: {
    width: '100%',
    borderRadius: 14,
  },

  registerButton: {
    minHeight: 50,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
  },

  registerText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
});
export default ProfileScreen;