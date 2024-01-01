import React from 'react';
import { Button } from 'native-base';

const AppButton = ({
  variant = 'solid',
  startIcon,
  endIcon,
  text,
  isLoading = false,
  isDisabled = false,
  onPress,
}) => {
  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      onPress={onPress}
      isLoading={isLoading}
      isDisabled={isDisabled}
      isLoadingText="Loading..."
      _text={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
    >
      {text}
    </Button>
  );
};

export default AppButton;
