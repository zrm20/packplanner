import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import useStyles from './WaterScreen.styles';
import { useTheme } from '../../../theme';
import { SafeAreaScreen, ScreenHeader } from '../../ui';
import WaterBottle from '../WaterBottle/WaterBottle';
import WaterItemsList from '../WaterItemsList/WaterItemsList';
import WaterStats from '../WaterStats/WaterStats';

export default function WaterScreen(): JSX.Element {
  const styles = useStyles();
  const [fillLevel, setFillLevel] = useState<number>(100);
  const { colors } = useTheme();

  return (
    <SafeAreaScreen style={styles.screen}>
      <ScreenHeader eyebrow="Hydration" title="Water" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Surface style={styles.containersCard} elevation={0}>
          <WaterBottle fillLevel={fillLevel} size={70} />
          <WaterItemsList />
        </Surface>

        <Surface style={styles.fillCard} elevation={0}>
          <View style={styles.fillLabelRow}>
            <Text variant="bodyMedium" style={styles.fillLabel}>
              Fill level
            </Text>
            <Text variant="headlineSmall">{fillLevel}%</Text>
          </View>
          <Slider
            accessibilityLabel="Fill level"
            value={fillLevel}
            onValueChange={setFillLevel}
            minimumValue={0}
            maximumValue={100}
            step={1}
            style={styles.slider}
            minimumTrackTintColor={colors.tertiary}
            maximumTrackTintColor={colors.outlineVariant}
            thumbTintColor={colors.tertiary}
          />
        </Surface>

        <WaterStats fillLevel={fillLevel} />
      </ScrollView>
    </SafeAreaScreen>
  );
}
