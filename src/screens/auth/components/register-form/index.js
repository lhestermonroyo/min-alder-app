import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Box, Heading, ScrollView, VStack } from 'native-base';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../../../../firebaseConfig';

import AppInput from '../../../../components/app-input';
import AppButton from '../../../../components/app-button';

const RegisterForm = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await addDoc(collection(db, 'users'), {
        email: value.email,
        password: value.password,
        createdAt: new Date(),
      });
      console.log('[handleSubmit] response', response);
    } catch (error) {
      console.log('[handleSubmit] error', error);
    }
  };

  return (
    <ScrollView paddingX={6}>
      <VStack space={4} justifyContent="center" flex={1}>
        <VStack>
          <Heading fontSize={32}>Opret konto</Heading>
          <Heading size="sm" color="white">
            Lad os komme i gang ved at udfylde formularen nedenfor.
          </Heading>
        </VStack>

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
          <AppButton text="Tilmelde" onPress={handleSubmit} />

          <Heading size="sm" textAlign="center" color="white">
            Eller tilmeld dig med
          </Heading>
          <AppButton mode="outlined" icon="google" text="Fortsæt med Google" />
          <AppButton mode="outlined" icon="apple" text="Fortsæt med Apple" />
        </VStack>
      </VStack>
      <Box paddingBottom={12} />
    </ScrollView>
  );
};

export default RegisterForm;
