import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../theme/colors';

function ScreenPlaceholder({title, owner, description}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.badge}>{owner}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.note}>
          Route is connected. Replace this placeholder with the real UI.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: colors.background},
  content: {flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28},
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    color: colors.primary,
    backgroundColor: colors.surfaceHigh,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {marginTop: 18, color: colors.text, fontSize: 28, fontWeight: '800', textAlign: 'center'},
  description: {marginTop: 10, color: colors.textMuted, fontSize: 15, lineHeight: 23, textAlign: 'center'},
  note: {marginTop: 24, color: colors.textMuted, fontSize: 12, textAlign: 'center'},
});

export default ScreenPlaceholder;
