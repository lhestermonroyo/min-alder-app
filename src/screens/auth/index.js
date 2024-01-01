import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Box, Heading, ScrollView, Stack, Text, Pressable } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';

import metrics from '../../helpers/metrics';

import Layout from '../../components/layout';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';

const Auth = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'login', title: 'Log ind' },
    { key: 'register', title: 'Tilmelde' },
  ]);

  const layout = useWindowDimensions();

  const renderTabBar = props => {
    return (
      <Box alignSelf="center" marginY={6} flexDirection="row" width={225}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <Box
              key={i}
              borderRightWidth={i === 0 && 1}
              borderColor="#4b39ef"
              flex={1}
              padding={2}
              alignItems="center"
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Text
                  fontSize={18}
                  fontWeight={index === i ? 'bold' : 'normal'}
                  color={index === i ? '#4b39ef' : 'gray.800'}
                >
                  {route.title}
                </Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'login':
        return <LoginForm handleIndex={() => setIndex(1)} />;
      case 'register':
        return <RegisterForm handleIndex={() => setIndex(0)} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Box flex={1} justifyContent="center">
        <Box
          height="1/6"
          background={{
            linearGradient: {
              colors: ['#105dfb', '#8ac7ff'],
            },
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Heading fontSize={36} fontWeight="medium" color="#fff">
            MinAlder
          </Heading>
        </Box>
        <Box
          flex={1}
          borderTopRadius={24}
          alignSelf="center"
          width="full"
          background="#fff"
        >
          <TabView
            swipeEnabled={false}
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Auth;
