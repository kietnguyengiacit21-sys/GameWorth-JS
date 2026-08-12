import React, {useEffect} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../theme/colors';

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Onboarding'), 1500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.brand}>
          <Text style={styles.logo}>GameWorth</Text>
          <Text style={styles.tagline}>Discover top games, track your ratings, and join a community of players.</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Your next favorite game starts here.</Text>
        </View>

        <Pressable style={styles.action} onPress={() => navigation.replace('Onboarding')}>
          <Text style={styles.actionText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: colors.background},
  container: {
    flex: 1,
    padding: 28,
    justifyContent: 'space-between',
  },
  brand: {
    marginTop: 48,
  },
  logo: {
    color: colors.primary,
    fontSize: 36,
    fontWeight: '900',
  },
  tagline: {
    marginTop: 14,
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 40,
  },
  action: {
    marginBottom: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '900',
  },
});

export default SplashScreen;
