import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors} from '../theme/colors';

function EmptyState({title, message}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 32, alignItems: 'center'},
  title: {color: colors.text, fontSize: 20, fontWeight: '800'},
  message: {marginTop: 8, color: colors.textMuted, lineHeight: 21, textAlign: 'center'},
});

export default EmptyState;
