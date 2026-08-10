import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {colors} from '../theme/colors';

function LoadingState({message = 'Loading...'}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size="large" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  message: {marginTop: 10, color: colors.textMuted},
});

export default LoadingState;
