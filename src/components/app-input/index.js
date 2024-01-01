import React from 'react';
import { Text, FormControl, Input } from 'native-base';

const AppInput = ({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  rightElement = null,
  error,
}) => {
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        variant="outline"
        size="lg"
        padding={4}
        type="text"
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        textContentType="none"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        rightElement={rightElement}
      />
      {error && (
        <FormControl.HelperText color="error.400" fontSize="xs">
          {error}
        </FormControl.HelperText>
      )}
    </FormControl>
  );
};

export default AppInput;
