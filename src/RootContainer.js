import React, { Fragment, useEffect, useState } from 'react';
import { Text } from 'native-base';
import { useRecoilState } from 'recoil';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Public from './navigators/public';
import Landing from './screens/landing';

import states from './states';
import app from '../firebaseConfig';

const fbAuth = getAuth(app);

const RootContainer = () => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useRecoilState(states.auth);
  const { authenticated } = auth;

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setLoading(true);

      onAuthStateChanged(fbAuth, user => {
        setAuth({
          ...auth,
          authenticated: !!user?.uid,
          user: { uid: user?.uid, name: user?.displayName, email: user?.email },
        });
      });
    } catch (error) {
      setAuth({
        ...auth,
        authenticated: false,
        user: null,
      });

      console.log('[init] error', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <Fragment>{authenticated ? <Landing /> : <Public />}</Fragment>;
};

export default RootContainer;
