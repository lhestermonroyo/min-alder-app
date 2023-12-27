import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from '../../screens/auth';

const PublicStack = createNativeStackNavigator();

const Public = () => {
  return (
    <PublicStack.Navigator
      initialRouteName="Authentication"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <PublicStack.Screen name="Authentication" component={Auth} />
    </PublicStack.Navigator>
  );
};

export default Public;
