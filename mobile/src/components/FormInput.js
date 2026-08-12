import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {colors} from '../theme/colors';

function FormInput({label, value, onChangeText, placeholder, secureTextEntry, keyboardType = 'default', autoCapitalize = 'none', ...props}) {
  return (
    <View style={styles.field}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.text,
    backgroundColor: colors.surfaceHigh,
    fontSize: 15,
  },
});

export default FormInput;
