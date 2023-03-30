import React from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';
import { Title } from 'react-native-paper';

import useStyles from './ContainedModalTitle.styles';
import CloseScreenButton, { CloseScreenButtonProps } from '../CloseScreenButton/CloseScreenButton';

interface ContainedModalTitleProps extends CloseScreenButtonProps {
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

export default function ContainedModalTitle(props: ContainedModalTitleProps): JSX.Element {
  const styles = useStyles();
  const { title, containerStyle, titleStyle, ...rest } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <CloseScreenButton style={styles.closeButton} {...rest} />
      <Title style={titleStyle}>{title}</Title>
    </View>
  );
}
