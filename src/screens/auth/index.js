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
      <Box
        alignSelf="center"
        marginTop={6}
        marginBottom={4}
        borderBottomWidth={1}
        flexDirection="row"
        background="white"
        borderColor="black"
        borderWidth={1}
        borderRadius={12}
        width={290}
      >
        {props.navigationState.routes.map((route, i) => {
          return (
            <Box
              key={i}
              flex={1}
              padding={2}
              background={index === i ? '#e0e3e7' : 'white'}
              alignItems="center"
              borderRadius={12}
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Text
                  fontSize={18}
                  fontWeight="medium"
                  color={index === i ? 'gray.500' : 'black'}
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
        return <LoginForm />;
      case 'register':
        return <RegisterForm />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Box flex={1} justifyContent="center">
        <Stack>
          <Box
            marginX={10}
            height={230}
            borderRadius={16}
            borderColor="white"
            borderWidth={1}
            background={{
              linearGradient: {
                colors: ['#105dfb', '#8ac7ff'],
              },
            }}
            paddingTop={10}
            alignItems="center"
          >
            <Heading fontSize={36} fontWeight="medium">
              MinAlder
            </Heading>
          </Box>
          <Stack marginX={4}>
            <Box
              style={{
                marginTop: -110,
              }}
              alignSelf="center"
              width="full"
              maxWidth={570}
              height={530}
              borderRadius={16}
              borderColor="white"
              borderWidth={2}
              background="#105dfb"
            >
              <TabView
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
};

export default Auth;
