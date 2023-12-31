import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Box, Heading, ScrollView, VStack } from 'native-base';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import AppInput from '../../../../components/app-input';
import AppButton from '../../../../components/app-button';

import app from '../../../../../firebaseConfig';

const db = getFirestore(app);
const auth = getAuth(app);

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const userCred = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );

      if (userCred) {
        console.log('[handleSubmit] userCred', userCred);

        const response = await addDoc(collection(db, 'users'), {
          email: userCred.user.email,
          uid: userCred.user.uid,
          createdAt: new Date(),
        });

        console.log('[handleSubmit] response', response);
      }
    } catch (error) {
      console.log('[handleSubmit] error', error);
    } finally {
      setLoading(false);
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
