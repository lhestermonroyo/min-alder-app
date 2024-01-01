import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { PaperProvider } from 'react-native-paper';
import { RecoilRoot } from 'recoil';

import RootContainer from './src/RootContainer';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

export default function App() {
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
    colors: {
      primary: {
        50: '#a59cf7',
        100: '#9388f5',
        200: '#8174f4',
        300: '#6f61f2',
        400: '#5d4df1',
        500: '#4b39ef',
        600: '#4433d7',
        700: '#3c2ebf',
        800: '#3528a7',
        900: '#2d228f',
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
            <RootContainer />
          </NavigationContainer>
        </PaperProvider>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}
