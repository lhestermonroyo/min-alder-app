import React from 'react';
import { Box, Text } from 'native-base';
import { getAuth, signOut } from 'firebase/auth';
import { useRecoilState } from 'recoil';

import Layout from '../../components/layout';
import AppButton from '../../components/app-button';

import states from '../../states';
import app from '../../../firebaseConfig';

const fbAuth = getAuth(app);

const Landing = () => {
  const [auth, setAuth] = useRecoilState(states.auth);
  const { user } = auth;

  const handleLogout = async () => {
    try {
      await signOut(fbAuth);

      setAuth({
        ...auth,
        authenticated: false,
        user: null,
      });
    } catch (error) {
      console.log('[handleLogout] error', error);
    }
  };

  return (
    <Layout>
      <Box>
        <Text>Welcome! {user?.displayName || user?.email}</Text>
        <AppButton text="Logout" onPress={handleLogout} />
      </Box>
    </Layout>
  );
};

export default Landing;
