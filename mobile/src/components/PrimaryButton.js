import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {colors} from '../theme/colors';

function PrimaryButton({title, onPress, disabled = false, style}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  pressed: {opacity: 0.82},
  disabled: {opacity: 0.45},
  text: {color: colors.onPrimary, fontSize: 15, fontWeight: '800'},
});

export default PrimaryButton;
