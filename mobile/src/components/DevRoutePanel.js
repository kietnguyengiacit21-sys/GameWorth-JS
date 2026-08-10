import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../theme/colors';

const routes = [
  {label: 'Splash', open: navigation => navigation.navigate('Splash')},
  {label: 'Onboarding', open: navigation => navigation.navigate('Onboarding')},
  {label: 'Login', open: navigation => navigation.navigate('Login')},
  {label: 'Register', open: navigation => navigation.navigate('Register')},
  {label: 'Forgot Password', open: navigation => navigation.navigate('ForgotPassword')},
  {label: 'Search Game', open: navigation => navigation.navigate('SearchGame')},
  {label: 'Filter Game', open: navigation => navigation.navigate('FilterGame')},
  {label: 'Game Detail', open: navigation => navigation.navigate('GameDetail', {gameId: 1})},
  {label: 'Game Media', open: navigation => navigation.navigate('GameMedia', {gameId: 1})},
  {label: 'Requirements', open: navigation => navigation.navigate('SystemRequirements', {gameId: 1})},
  {label: 'Community Rating', open: navigation => navigation.navigate('CommunityRating', {gameId: 1})},
  {label: 'Review List', open: navigation => navigation.navigate('ReviewList', {gameId: 1})},
  {label: 'Review Detail', open: navigation => navigation.navigate('ReviewDetail', {reviewId: 1})},
  {label: 'Add Review', open: navigation => navigation.navigate('AddReview', {gameId: 1})},
  {label: 'Edit Review', open: navigation => navigation.navigate('EditReview', {reviewId: 1})},
  {
    label: 'Delete Review',
    open: navigation => navigation.navigate('DeleteReviewConfirmation', {reviewId: 1}),
  },
  {label: 'Edit Profile', open: navigation => navigation.navigate('EditProfile')},
];

function DevRoutePanel() {
  const navigation = useNavigation();

  if (!__DEV__) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Development route checklist</Text>
      <Text style={styles.note}>This panel only appears in development builds.</Text>

      <View style={styles.grid}>
        {routes.map(route => (
          <Pressable
            key={route.label}
            onPress={() => route.open(navigation)}
            style={({pressed}) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.buttonText}>{route.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  title: {color: colors.text, fontSize: 17, fontWeight: '800'},
  note: {marginTop: 4, color: colors.textMuted, fontSize: 12},
  grid: {marginTop: 14, flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  button: {paddingHorizontal: 11, paddingVertical: 9, borderRadius: 10, backgroundColor: colors.surfaceHigh},
  pressed: {opacity: 0.7},
  buttonText: {color: colors.primary, fontSize: 12, fontWeight: '700'},
});

export default DevRoutePanel;
