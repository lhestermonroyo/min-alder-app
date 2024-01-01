import React, { useState } from 'react';
import {
  Box,
  Divider,
  HStack,
  ScrollView,
  VStack,
  IconButton,
  Text,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import AppInput from '../../../../components/app-input';
import AppButton from '../../../../components/app-button';

import app from '../../../../../firebaseConfig';

const db = getFirestore(app);
const auth = getAuth(app);

const RegisterForm = ({ handleIndex }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

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
        <AppInput
          label="E-mail"
          placeholder="Indtast e-mail"
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
          placeholder="Indtast adgangskode"
          value={value.password}
          onChangeText={password =>
            setValue({
              ...value,
              password,
            })
          }
          secureTextEntry={!showPassword.password}
          rightElement={
            <IconButton
              size="md"
              variant="link"
              icon={
                showPassword ? (
                  <Ionicons name="md-eye-off-outline" size={18} />
                ) : (
                  <Ionicons name="md-eye-outline" size={18} />
                )
              }
              onPress={() =>
                setShowPassword({
                  ...showPassword,
                  password: !showPassword.password,
                })
              }
            />
          }
        />

        <AppInput
          label="Bekræft adgangskode"
          placeholder="Indtast bekræft adgangskode"
          value={value.confirmPassword}
          onChangeText={confirmPassword =>
            setValue({
              ...value,
              confirmPassword,
            })
          }
          secureTextEntry={!showPassword.confirmPassword}
          rightElement={
            <IconButton
              size="md"
              variant="link"
              icon={
                showPassword ? (
                  <Ionicons name="md-eye-off-outline" size={18} />
                ) : (
                  <Ionicons name="md-eye-outline" size={18} />
                )
              }
              onPress={() =>
                setShowPassword({
                  ...showPassword,
                  confirmPassword: !showPassword.confirmPassword,
                })
              }
            />
          }
        />

        <AppButton
          text="Kom igang"
          isLoading={loading}
          onPress={handleSubmit}
        />

        <Box marginTop={6}>
          <Divider />
          <VStack top={-12} alignItems="center">
            <Box backgroundColor="#fff" paddingX={4}>
              <Text textAlign="center" color="gray.800">
                Eller tilmeld dig med
              </Text>
            </Box>
          </VStack>
        </Box>

        <HStack space={4} justifyContent="center">
          <IconButton
            variant="outline"
            borderRadius="full"
            width={50}
            height={50}
            icon={<Ionicons name="logo-google" size={24} color="#4b39ef" />}
          />
          <IconButton
            variant="outline"
            borderRadius="full"
            width={50}
            height={50}
            icon={<Ionicons name="logo-apple" size={24} color="#4b39ef" />}
          />
        </HStack>

        <Text marginTop={12} textAlign="center" color="gray.800">
          Har du ikke en konto endnu?
          <AppButton variant="link" text="Log ind" onPress={handleIndex} />
        </Text>
      </VStack>
    </ScrollView>
  );
};

export default RegisterForm;
