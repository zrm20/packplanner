import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

import useStyles from './MyPackHeader.styles';
import { usePackModel, usePacks } from '../../../hooks';

interface MyPackHeaderProps {
  style?: ViewStyle;
}

interface PackProps extends MyPackHeaderProps {
  pack: PackData;
}

function Pack(props: PackProps): JSX.Element {
  const styles = useStyles();
  const packModel = usePackModel(props.pack);

  return (
    <View style={[styles.container, props.style]}>
      <Avatar.Icon icon="bag-personal" />

      <View style={styles.dataContainer}>
        <Text variant="titleLarge" numberOfLines={1} adjustsFontSizeToFit>
          {packModel.brand} - {packModel.model}
        </Text>
        <Text variant="titleMedium" numberOfLines={1} adjustsFontSizeToFit>
          {packModel.capacity} Liters | {packModel.getWeight()}
        </Text>
      </View>
    </View>
  );
}

function NoPack(props: MyPackHeaderProps): JSX.Element {
  const styles = useStyles();

  return (
    <View style={[styles.emptyContainer, props.style]}>
      <Text variant="titleLarge" style={styles.emptyText}>
        No Pack Selected
      </Text>
      <Text>Select a pack by tapping on a pack in the Locker Tab</Text>
    </View>
  );
}

export default function MyPackHeader(props: MyPackHeaderProps): JSX.Element {
  const { selectedPack } = usePacks();

  if (selectedPack) {
    return <Pack pack={selectedPack} style={props.style} />;
  } else {
    return <NoPack style={props.style} />;
  }
}
