import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Box, Heading, ScrollView, VStack } from 'native-base';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRecoilState } from 'recoil';

import AppInput from '../../../../components/app-input';
import AppButton from '../../../../components/app-button';

import states from '../../../../states';
import app from '../../../../../firebaseConfig';

const fbAuth = getAuth(app);

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [auth, setAuth] = useRecoilState(states.auth);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const userCred = await signInWithEmailAndPassword(
        fbAuth,
        value.email,
        value.password
      );

      if (userCred) {
        console.log('[handleSubmit] userCred', userCred);

        setAuth({
          ...auth,
          authenticated: !!userCred?.uid,
          user: {
            uid: userCred?.uid,
            name: userCred?.displayName,
            email: userCred?.email,
          },
        });
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
          <AppButton text="Kom igang" onPress={handleSubmit} />

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
