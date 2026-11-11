import React from 'react';
import { ViewStyle } from 'react-native';

import CloseScreenButton, { CloseScreenButtonProps } from '../CloseScreenButton/CloseScreenButton';
import ScreenHeader from '../ScreenHeader/ScreenHeader';

interface ContainedModalTitleProps extends CloseScreenButtonProps {
  title: string;
  eyebrow?: string;
  containerStyle?: ViewStyle;
}

export default function ContainedModalTitle(props: ContainedModalTitleProps): JSX.Element {
  const { title, eyebrow = 'My pack / Field guide', containerStyle, ...rest } = props;
  return (
    <ScreenHeader
      eyebrow={eyebrow}
      title={title}
      style={containerStyle}
      action={<CloseScreenButton {...rest} />}
    />
  );
}
