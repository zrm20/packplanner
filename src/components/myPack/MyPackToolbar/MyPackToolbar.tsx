import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Chip, Icon } from 'react-native-paper';

import useStyles from './MyPackToolbar.styles';
import { useInventoryActions } from '../../../hooks';

interface MyPackToolbarProps {
  style?: ViewStyle;
  toggleNewListModal(): void;
}

export default function MyPackToolbar(props: MyPackToolbarProps): JSX.Element {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { emptyPack } = useInventoryActions();

  const actions = [
    {
      label: 'Breakdown',
      icon: 'chart-pie',
      onPress: () => navigate('MyPack', { screen: 'Chart' }),
    },
    {
      label: 'Checklist',
      icon: 'playlist-check',
      onPress: () => navigate('MyPack', { screen: 'Checklist' }),
    },
    {
      label: 'Save list',
      icon: 'content-save-outline',
      onPress: props.toggleNewListModal,
    },
    {
      label: 'Load list',
      icon: 'import',
      onPress: () => navigate('MyPack', { screen: 'Lists' }),
    },
    {
      label: 'Empty',
      icon: 'trash-can-outline',
      onPress: emptyPack,
      danger: true,
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={props.style}
      contentContainerStyle={styles.container}>
      {actions.map((action) => (
        <Chip
          key={action.label}
          compact
          mode="outlined"
          icon={
            action.danger
              ? ({ size }) => (
                  <Icon
                    source={action.icon}
                    size={size}
                    color={styles.dangerIcon.color as string}
                  />
                )
              : action.icon
          }
          style={styles.chip}
          textStyle={styles.chipLabel}
          onPress={action.onPress}>
          {action.label}
        </Chip>
      ))}
    </ScrollView>
  );
}
