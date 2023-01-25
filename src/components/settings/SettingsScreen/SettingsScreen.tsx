import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";
import { useSettings } from "../../../hooks";
import { RootTabParamList } from "../../../navigation/navigation.types";

import { SafeAreaScreen } from "../../ui";
import useStyles from "./SettingsScreen.styles";

type SettingsScreenProps = BottomTabScreenProps<RootTabParamList, 'Settings'>;

export default function SettingsScreen(props: SettingsScreenProps): JSX.Element {
  const styles = useStyles();
  const { weightUnits, setWeightUnits, liquidUnits, setLiquidUnits } = useSettings();

  function handleWeightChange(newValue: string): void {
    setWeightUnits(newValue as WeightUnit);
  };

  function handleLiquidChange(newValue: string): void {
    setLiquidUnits(newValue as LiquidCapacityUnit);
  };

  return (
    <SafeAreaScreen style={styles.container} >
      <Text variant="headlineLarge" style={styles.title}>Settings</Text>

      <View style={styles.settingsContainer}>
        <View style={styles.unitSelector}>
          <Text variant="titleMedium">Weight Units</Text>
          <SegmentedButtons
            value={weightUnits}
            onValueChange={handleWeightChange}
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
        </View>
        <View style={styles.unitSelector} >

          <Text variant="titleMedium">Liquid Units</Text>
          <SegmentedButtons
            value={liquidUnits}
            onValueChange={handleLiquidChange}
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
      </View>
    </SafeAreaScreen>
  );
};
