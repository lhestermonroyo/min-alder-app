import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Box, Heading, ScrollView, Spacer, VStack } from 'native-base';

import AppInput from '../../../../components/app-input';
import AppButton from '../../../../components/app-button';

const LoginForm = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView paddingX={6}>
      <VStack space={4} justifyContent="center" flex={1}>
        <Heading fontSize={32}>Opret konto</Heading>

        <AppInput
          label="E-mail"
          value={value.email}
          onChangeText={email =>
            setValue({
              ...value,
              email,
            })
          }
        />

        <AppInput
          label="Adgangskodea"
          value={value.password}
          onChangeText={password =>
            setValue({
              ...value,
              password,
            })
          }
          secureTextEntry={showPassword}
          right={
            <TextInput.Icon
              onPress={() => setShowPassword(!showPassword)}
              icon={showPassword ? 'eye-off' : 'eye'}
            />
          }
        />

        <VStack alignItems="center" space={4}>
          <AppButton text="Kom igang" />

          <Heading size="sm" textAlign="center" color="white">
            Eller log ind med
          </Heading>
          <AppButton mode="outlined" icon="google" text="Fortsæt med Google" />
          <AppButton mode="outlined" icon="apple" text="Fortsæt med Apple" />

          <Button
            mode="outlined"
            buttonColor="#fff"
            textColor="#000"
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
            }}
          >
            Glemt kodeord?
          </Button>
        </VStack>
      </VStack>
      <Box paddingBottom={12} />
    </ScrollView>
  );
};

export default LoginForm;
