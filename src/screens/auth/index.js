import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Box, Heading, Text, Pressable } from 'native-base';
import { useRecoilState } from 'recoil';
import { TabView } from 'react-native-tab-view';
import {
  getFirestore,
  getCountFromServer,
  query,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

import states from '../../states';

import Layout from '../../components/layout';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';

import app from '../../../firebaseConfig';

const db = getFirestore(app);

const Auth = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'login', title: 'Log ind' },
    { key: 'register', title: 'Tilmelde' },
  ]);

  const [auth, setAuth] = useRecoilState(states.auth);

  const layout = useWindowDimensions();

  const checkUser = async user => {
    const querySnapshot = await getCountFromServer(
      query(collection(db, 'users'), where('uid', '==', user.uid))
    );

    console.log('[checkUser] querySnapshot', querySnapshot.data().count);
    return querySnapshot.data().count > 0;
  };

  const authenticateUser = async user => {
    const exists = await checkUser(user);

    if (!exists) {
      await addDoc(collection(db, 'users'), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });
    }

    setAuth({
      ...auth,
      authenticated: true,
      user: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      },
    });
  };

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
        return (
          <LoginForm
            redirect={() => setIndex(1)}
            authenticateUser={authenticateUser}
          />
        );
      case 'register':
        return (
          <RegisterForm
            redirect={() => setIndex(0)}
            authenticateUser={authenticateUser}
          />
        );
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
