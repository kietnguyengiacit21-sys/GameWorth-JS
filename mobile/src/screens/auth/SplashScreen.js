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
        <View style={styles.centered}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>G</Text>
          </View>
          <Text style={styles.title}>GAME</Text>
          <Text style={styles.subtitle}>WORTH</Text>
        </View>
        <Text style={styles.loadingText}>Loading...</Text>
        <Text style={styles.footer}>2026 GAMEWORTH, INC.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#000'},
  container: {
    flex: 1,
    padding: 28,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#3cff6e',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(60,255,110,0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 20,
  },
  subtitle: {
    color: '#3cff6e',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(60,255,110,0.35)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 18,
    marginTop: -6,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: 'rgba(60,255,110,0.12)',
    borderWidth: 1,
    borderColor: '#3cff6e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    shadowColor: '#3cff6e',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 6,
  },
  iconText: {
    color: '#3cff6e',
    fontSize: 32,
    fontWeight: '900',
    textShadowColor: 'rgba(60,255,110,0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 16,
  },
  loadingText: {
    color: '#7fff9d',
    fontSize: 18,
    marginBottom: 24,
  },
  footer: {
    color: '#2fe27d',
    fontSize: 12,
    marginBottom: 18,
    letterSpacing: 1,
  },
});

export default SplashScreen;
