import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Landing from '../../screens/landing';

const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const PrivateStack = createBottomTabNavigator();

const Private = () => {
  return (
    <PrivateStack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: '#4b39ef',
        tabBarStyle: { backgroundColor: '#fbfbfb' },
      }}
    >
      <PrivateStack.Screen
        name="Landing"
        component={Landing}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <PrivateStack.Screen
        name="Landing2"
        component={Landing}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Upload',
        }}
      />
      <PrivateStack.Screen
        name="Landing3"
        component={Landing}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Account',
        }}
      />
    </PrivateStack.Navigator>
  );
};

export default Private;
