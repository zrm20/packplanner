import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { LockerStackParamList } from '../../../navigation/navigation.types';
import { PacksScroller } from '../../packs';
import { SafeAreaScreen } from '../../ui';
import InventoryList from '../InventoryList/InventoryList';

type InventoryScreenProps = NativeStackScreenProps<LockerStackParamList, 'Inventory'>;

export default function InventoryScreen(props: InventoryScreenProps): JSX.Element {
  return (
    <SafeAreaScreen>
      <PacksScroller />
      <InventoryList />
    </SafeAreaScreen>
  );
}
