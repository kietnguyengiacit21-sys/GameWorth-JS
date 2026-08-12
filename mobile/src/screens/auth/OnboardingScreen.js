import React from 'react';
import {Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import PrimaryButton from '../../components/PrimaryButton';
import {colors} from '../../theme/colors';

const features = [
  {
    title: 'Discover new games',
    description: 'Browse trending titles, curated recommendations, and the latest releases in one app.',
  },
  {
    title: 'Rate your play',
    description: 'Save your reviews, compare ratings, and share feedback with the community.',
  },
  {
    title: 'Manage your library',
    description: 'Keep every favorite game, wishlist item, and play record ready to revisit.',
  },
];

function OnboardingScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to GameWorth</Text>
        <Text style={styles.subtitle}>Your game collection, ratings, and discoveries on one clean dashboard.</Text>

        {features.map(feature => (
          <View key={feature.title} style={styles.featureCard}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureText}>{feature.description}</Text>
          </View>
        ))}

        <PrimaryButton title="Login" onPress={() => navigation.navigate('Login')} style={styles.primaryButton} />

        <Pressable onPress={() => navigation.navigate('Register')} style={styles.linkButton}>
          <Text style={styles.linkText}>Create a new account</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: colors.background},
  container: {
    padding: 24,
    gap: 18,
  },
  title: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  featureCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  featureTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  featureText: {
    marginTop: 8,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    marginTop: 20,
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '800',
  },
});

export default OnboardingScreen;
