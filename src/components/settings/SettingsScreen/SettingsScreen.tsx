import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

import useStyles from './SettingsScreen.styles';
import { useSettings } from '../../../hooks';
import { SettingsStackParamList } from '../../../navigation/navigation.types';
import { SafeAreaScreen, ScreenHeader } from '../../ui';
import InstallApp from '../InstallApp/InstallApp';
import UnitSelector from '../UnitSelector/UnitSelector';
import UserWidget from '../UserWidget/UserWidget';

type SettingsScreenProps = NativeStackScreenProps<SettingsStackParamList, 'SettingsHome'>;

export default function SettingsScreen(props: SettingsScreenProps): JSX.Element {
  const styles = useStyles();
  const { weightUnit, setWeightUnits, liquidUnit, setLiquidUnits } = useSettings();
  const today = new Date(Date.now());

  function handleWeightChange(newValue: string): void {
    setWeightUnits(newValue as WeightUnit);
  }

  function handleLiquidChange(newValue: string): void {
    setLiquidUnits(newValue as LiquidCapacityUnit);
  }

  return (
    <SafeAreaScreen style={styles.container}>
      <ScreenHeader eyebrow="Preferences" title="Settings" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <UserWidget style={styles.userWidget} />

        <View style={styles.settingsContainer}>
          <Text variant="headlineSmall">Units</Text>
          <UnitSelector
            label="Weight Units"
            value={weightUnit.value}
            onChange={handleWeightChange}
            buttons={[
              {
                value: 'oz',
                label: 'oz',
              },
              {
                value: 'lb',
                label: 'lbs',
              },
              {
                value: 'kg',
                label: 'kg',
              },
            ]}
          />
          <UnitSelector
            label="Liquid Units"
            value={liquidUnit.value}
            onChange={handleLiquidChange}
            buttons={[
              {
                value: 'oz',
                label: 'oz',
              },
              {
                value: 'ml',
                label: 'ml',
              },
            ]}
          />
        </View>
        <InstallApp />
        <Text variant="bodySmall" style={styles.copyright}>
          Copyright {today.getFullYear()} Zach McCoy
        </Text>
      </ScrollView>
    </SafeAreaScreen>
  );
}
