/**
 * DISPOSABLE: Water screen seeded with partial fill from prototype query config.
 * Production WaterScreen remains unchanged (defaults to 100%).
 */
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { SafeAreaScreen } from '../components/ui';
import WaterBottle from '../components/water/WaterBottle/WaterBottle';
import WaterItemsList from '../components/water/WaterItemsList/WaterItemsList';
import WaterStats from '../components/water/WaterStats/WaterStats';
import useStyles from '../components/water/WaterScreen/WaterScreen.styles';
import { useTheme } from '../theme';
import { usePrototypeControls } from './PrototypeControlsContext';

export default function PrototypeWaterScreen(): JSX.Element {
  const styles = useStyles();
  const { colors } = useTheme();
  const { waterFill } = usePrototypeControls();
  const [fillLevel, setFillLevel] = useState<number>(waterFill);

  return (
    <SafeAreaScreen style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.waterBottleContainer}>
          <WaterBottle fillLevel={fillLevel} size={80} />
        </View>
        <WaterItemsList />
      </View>

      <View style={styles.sliderContainer}>
        <Text variant="titleMedium">Liquid Fill Level {fillLevel}%</Text>
        <Slider
          value={fillLevel}
          onValueChange={setFillLevel}
          minimumValue={0}
          maximumValue={100}
          step={1}
          style={styles.slider}
          minimumTrackTintColor={colors.secondary}
        />
      </View>

      <View style={styles.statsContainer}>
        <WaterStats fillLevel={fillLevel} />
      </View>
    </SafeAreaScreen>
  );
}
