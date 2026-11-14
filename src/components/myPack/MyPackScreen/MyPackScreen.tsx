import React, { useState } from 'react';
import { Portal } from 'react-native-paper';

import useStyles from './MyPackScreen.styles';
import { MyPackHomeScreenProps } from '../../../navigation/navigation.types';
import { NewListModal } from '../../lists';
import { SafeAreaScreen, ScreenHeader } from '../../ui';
import InPackList from '../InPackList/InPackList';
import MyPackHero from '../MyPackHero/MyPackHero';
import MyPackToolbar from '../MyPackToolbar/MyPackToolbar';

export default function MyPackScreen(props: MyPackHomeScreenProps): JSX.Element {
  const styles = useStyles();
  const [showNewListModal, setShowNewListModal] = useState<boolean>(false);

  function toggleNewListModal(): void {
    setShowNewListModal(!showNewListModal);
  }

  return (
    <Portal.Host>
      <SafeAreaScreen style={styles.container}>
        <InPackList>
          <ScreenHeader eyebrow="Loadout" title="My Pack" />
          <MyPackHero style={styles.hero} />
          <MyPackToolbar style={styles.toolbar} toggleNewListModal={toggleNewListModal} />
        </InPackList>
      </SafeAreaScreen>
      <NewListModal visible={showNewListModal} toggleVisibility={toggleNewListModal} />
    </Portal.Host>
  );
}
