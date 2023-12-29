import { Text, VStack } from 'native-base';
import React from 'react';
import { TextInput } from 'react-native-paper';

const AppInput = ({
  label,
  secureTextEntry,
  value,
  onChangeText,
  right = null,
  error,
}) => {
  return (
    <VStack>
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
      {error && <Text color="error.400">{error}</Text>}
    </VStack>
  );
};

export default AppInput;
