import React from 'react';
import { TextInput } from 'react-native-paper';

const AppInput = ({
  label,
  secureTextEntry,
  value,
  onChangeText,
  right = null,
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      mode="outlined"
      outlineColor="#e0e3e7"
      right={right}
      style={{
        backgroundColor: '#cfdffe',
      }}
      outlineStyle={{
        borderRadius: 8,
        borderWidth: 2,
      }}
    />
  );
};

export default AppInput;
