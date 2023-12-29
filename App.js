import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme, Text } from 'native-base';
import { PaperProvider } from 'react-native-paper';
import { RecoilRoot } from 'recoil';

import Public from './src/navigators/public';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Load the Jakarta Sans font
    Font.loadAsync({
      'jakarta-sans-light': require('./assets/fonts/PlusJakartaSans-Light.ttf'),
      'jakarta-sans-regular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
      'jakarta-sans-medium': require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
      'jakarta-sans-semibold': require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
      'jakarta-sans-bold': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
    });
  }, []);

  const theme = extendTheme({
    fontConfig: {
      JakartaSans: {
        100: {
          normal: 'jakarta-sans-light',
        },
        200: {
          normal: 'jakarta-sans-light',
        },
        300: {
          normal: 'jakarta-sans-light',
        },
        400: {
          normal: 'jakarta-sans-regular',
        },
        500: {
          normal: 'jakarta-sans-regular',
        },
        600: {
          normal: 'jakarta-sans-medium',
        },
        700: {
          normal: 'jakarta-sans-semibold',
        },
        800: {
          normal: 'jakarta-sans-bold',
        },
      },
    },
    fonts: {
      heading: 'JakartaSans',
      body: 'JakartaSans',
      mono: 'JakartaSans',
    },
    components: {
      Input: {
        baseStyle: {
          _focus: {
            borderColor: 'primary.600',
            backgroundColor: 'gray.50',
          },
        },
      },
    },
  });

  const config = {
    dependencies: {
      'linear-gradient': LinearGradient,
    },
  };

  return (
    <RecoilRoot>
      <NativeBaseProvider theme={theme} config={config}>
        <PaperProvider>
          <StatusBar style="auto" />
          <NavigationContainer>
            {authenticated ? (
              <Text color="amber.500">Authenticated</Text>
            ) : (
              <Public />
            )}
          </NavigationContainer>
        </PaperProvider>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}
