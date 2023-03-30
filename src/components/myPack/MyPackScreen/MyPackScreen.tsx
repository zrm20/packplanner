import React, { useState } from 'react';
import { Portal } from 'react-native-paper';

import useStyles from './MyPackScreen.styles';
import { MyPackHomeScreenProps } from '../../../navigation/navigation.types';
import { NewListModal } from '../../lists';
import { SafeAreaScreen } from '../../ui';
import InPackList from '../InPackList/InPackList';
import MyPackHeader from '../MyPackHeader/MyPackHeader';
import MyPackStatsBar from '../MyPackStatsBar/MyPackStatsBar';
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
        <MyPackHeader style={styles.header} />
        <MyPackStatsBar style={styles.stats} />
        <MyPackToolbar style={styles.toolbar} toggleNewListModal={toggleNewListModal} />
        <InPackList />
      </SafeAreaScreen>
      <NewListModal visible={showNewListModal} toggleVisibility={toggleNewListModal} />
    </Portal.Host>
  );
}
