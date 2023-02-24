import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";
import { useSettings } from "../../../hooks";
import { RootTabParamList } from "../../../navigation/navigation.types";

import { SafeAreaScreen } from "../../ui";
import UnitSelector from "../UnitSelector/UnitSelector";
import UserWidget from "../UserWidget/UserWidget";
import useStyles from "./SettingsScreen.styles";

type SettingsScreenProps = BottomTabScreenProps<RootTabParamList, 'Settings'>;

export default function SettingsScreen(props: SettingsScreenProps): JSX.Element {
  const styles = useStyles();
  const { weightUnit, setWeightUnits, liquidUnit, setLiquidUnits } = useSettings();

  function handleWeightChange(newValue: string): void {
    setWeightUnits(newValue as WeightUnit);
  };

  function handleLiquidChange(newValue: string): void {
    setLiquidUnits(newValue as LiquidCapacityUnit);
  };

  return (
    <SafeAreaScreen style={styles.container} >
      <Text variant="headlineLarge" style={styles.title}>Settings</Text>

      <UserWidget style={styles.userWidget} />

      <View style={styles.settingsContainer}>
        <UnitSelector
          label="WeightUnits"
          style={styles.unitSelector}
          value={weightUnit.value}
          onChange={handleWeightChange}
          buttons={
            [
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
            ]
          }
        />
        <UnitSelector
          label="Liquid Units"
          style={styles.unitSelector}
          value={liquidUnit.value}
          onChange={handleLiquidChange}
          buttons={
            [
              {
                value: 'oz',
                label: 'oz',
              },
              {
                value: 'ml',
                label: 'ml',
              },
            ]
          }
        />
      </View>
    </SafeAreaScreen>
  );
};
