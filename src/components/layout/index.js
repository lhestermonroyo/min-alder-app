import React from 'react';
import { Box } from 'native-base';
import { SafeAreaView, useWindowDimensions } from 'react-native';

const Layout = ({ children }) => {
  const layout = useWindowDimensions();
  return (
    <SafeAreaView
      style={{
        height: layout.height,
        backgroundColor: '#8ac7ff',
        flex: 1,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Layout;
