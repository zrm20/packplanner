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

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={props.style}
      contentContainerStyle={styles.container}>
      <Chip
        compact
        mode="outlined"
        icon="chart-pie"
        style={styles.chip}
        textStyle={styles.chipLabel}
        onPress={() => navigate('MyPack', { screen: 'Chart' })}>
        Breakdown
      </Chip>
      <Chip
        compact
        mode="outlined"
        icon="playlist-check"
        style={styles.chip}
        textStyle={styles.chipLabel}
        onPress={() => navigate('MyPack', { screen: 'Checklist' })}>
        Checklist
      </Chip>
      <Chip
        compact
        mode="outlined"
        icon="content-save-outline"
        style={styles.chip}
        textStyle={styles.chipLabel}
        onPress={props.toggleNewListModal}>
        Save list
      </Chip>
      <Chip
        compact
        mode="outlined"
        icon="import"
        style={styles.chip}
        textStyle={styles.chipLabel}
        onPress={() => navigate('MyPack', { screen: 'Lists' })}>
        Load list
      </Chip>
      <Chip
        compact
        mode="outlined"
        icon={({ size }) => (
          <Icon source="trash-can-outline" size={size} color={styles.dangerIcon.color as string} />
        )}
        style={styles.chip}
        textStyle={styles.chipLabel}
        onPress={emptyPack}>
        Empty
      </Chip>
    </ScrollView>
  );
}
