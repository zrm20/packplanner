/**
 * DISPOSABLE (#32): skips live auth + Firestore subscriptions; hydrates from fixture store.
 * Navigates to matrix views via query params (no new product tabs).
 */
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';

import { RootTabParamList } from '../navigation/navigation.types';
import {
  FIXTURE_EDIT_PACK_ID,
  FIXTURE_LIQUID_ITEM_ID,
  getFixturePackedItem,
  getFixturePack,
} from './fixtureDataset';
import { PrototypeQueryConfig } from './parsePrototypeQuery';
import PrototypeTabNavigator from './PrototypeTabNavigator';

type Props = {
  config: PrototypeQueryConfig;
};

export default function PrototypeAppNavigator({ config }: Props): JSX.Element {
  const navigationRef = useRef<NavigationContainerRef<RootTabParamList>>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !navigationRef.current) return;

    const nav = navigationRef.current;

    switch (config.view) {
      case 'locker':
        nav.navigate('Locker', { screen: 'Inventory' });
        break;
      case 'mypack':
        nav.navigate('MyPack', { screen: 'MyPackHome' });
        break;
      case 'checklist':
        nav.navigate('MyPack', { screen: 'Checklist' });
        break;
      case 'chart':
        nav.navigate('MyPack', { screen: 'Chart' });
        break;
      case 'water':
        nav.navigate('Water');
        break;
      case 'new-item':
        nav.navigate('Locker', { screen: 'NewItem' });
        break;
      case 'edit-item':
        nav.navigate('Locker', {
          screen: 'EditItem',
          params: { item: getFixturePackedItem(config.editItemId) },
        });
        break;
      case 'edit-item-liquid':
        nav.navigate('Locker', {
          screen: 'EditItem',
          params: {
            item: getFixturePackedItem(config.editItemId || FIXTURE_LIQUID_ITEM_ID),
          },
        });
        break;
      case 'new-pack':
        nav.navigate('Locker', { screen: 'NewPack' });
        break;
      case 'edit-pack':
        nav.navigate('Locker', {
          screen: 'EditPack',
          params: { pack: getFixturePack(config.editPackId || FIXTURE_EDIT_PACK_ID) },
        });
        break;
      case 'form-validation':
        nav.navigate('Locker', { screen: 'NewItem' });
        break;
      default:
        nav.navigate('Locker', { screen: 'Inventory' });
    }
  }, [config, ready]);

  return (
    <NavigationContainer ref={navigationRef} onReady={() => setReady(true)}>
      <PrototypeTabNavigator />
    </NavigationContainer>
  );
}
