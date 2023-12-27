import React from 'react';
import { Button } from 'react-native-paper';

const AppButton = ({
  mode = 'contained',
  icon,
  text,
  width = 230,
  onPress,
}) => {
  if (mode === 'contained') {
    return (
      <Button
        mode="contained"
        icon={icon}
        buttonColor="#4b39ef"
        style={{
          borderColor: '#fff',
          borderWidth: 1,
          width,
        }}
        onPress={onPress}
      >
        {text}
      </Button>
    );
  }

  return (
    <Button
      mode={mode}
      icon={icon}
      buttonColor="#fff"
      textColor="#000"
      style={{
        borderColor: '#000',
        borderWidth: 1,
        width,
      }}
      onPress={onPress}
    >
      {text}
    </Button>
  );
};

export default AppButton;
