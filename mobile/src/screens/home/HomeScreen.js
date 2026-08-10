import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import DevRoutePanel from '../../components/DevRoutePanel';
import {colors} from '../../theme/colors';

function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>GAMEWORTH</Text>
        <Text style={styles.title}>
          What is worth playing?
        </Text>
        <Text style={styles.subtitle}>
          Home UI will contain Featured, Top Worth It,
          Recently Added and Recently Updated.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Home skeleton</Text>
          <Text style={styles.sectionText}>
            Owner B replaces this area with the Stitch Home design.
          </Text>
        </View>

        <DevRoutePanel />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  title: {
    marginTop: 8,
    color: colors.text,
    fontSize: 31,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 10,
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 23,
  },
  section: {
    marginTop: 28,
    padding: 18,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  sectionText: {
    marginTop: 8,
    color: colors.textMuted,
    lineHeight: 21,
  },
});

export default HomeScreen;
