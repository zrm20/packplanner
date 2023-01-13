import React from "react";
import { Button, ButtonProps, IconButton } from "react-native-paper";
import { useFormikContext } from "formik";

interface SubmitButtonProps extends Partial<ButtonProps>{
  icon?: string
};

type IconButtonMode = 'outlined' | 'contained' | 'contained-tonal';
export default function SubmitButton(props: SubmitButtonProps): JSX.Element {
  const { submitForm } = useFormikContext();

  const { icon, mode = 'contained' } = props;

  if (icon) {
    let iconButtonMode: IconButtonMode;
  
    if(mode === 'text' || mode === 'elevated') {
      iconButtonMode = 'contained';
    } else {
      iconButtonMode = mode;
    };

    return (
      <IconButton 
        onPress={submitForm} 
        icon={icon} 
        {...props}
        mode={iconButtonMode}
      />
    )
  };

  return (
    <Button onPress={submitForm} {...props} >
      {props.children}
    </Button>
  );
};
