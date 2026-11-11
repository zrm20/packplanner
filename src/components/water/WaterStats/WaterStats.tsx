import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import useStyles from './WaterStats.styles';
import { useInventory, usePacks, useSettings } from '../../../hooks';
import {
  getTotalLiquidCapacity,
  getTotalLiquidWeight,
  getTotalWeight,
} from '../../../utils/inventoryUtils/inventoryUtils';

interface WaterStatsProps {
  fillLevel: number;
}

function StatRow(props: {
  label: string;
  now: string;
  full: string;
  first?: boolean;
  total?: boolean;
}): JSX.Element {
  const styles = useStyles();

  return (
    <View style={[styles.row, props.first && styles.firstRow, props.total && styles.totalRow]}>
      <Text variant="bodyMedium" style={styles.rowLabel}>
        {props.label}
      </Text>
      <Text variant="labelLarge" style={[styles.value, props.total && styles.totalNow]}>
        {props.now}
      </Text>
      <Text variant="labelLarge" style={styles.value}>
        {props.full}
      </Text>
    </View>
  );
}

export default function WaterStats(props: WaterStatsProps): JSX.Element {
  const styles = useStyles();
  const { fillLevel } = props;
  const { itemsInPack } = useInventory();
  const { selectedPack } = usePacks();
  const { liquidUnit, weightUnit } = useSettings();

  function round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  const fillPercentage: number = fillLevel / 100;

  const totalWeight = useMemo(() => getTotalWeight(itemsInPack), [itemsInPack]);
  const totalLiquidWeight = useMemo(() => getTotalLiquidWeight(itemsInPack), [itemsInPack]);
  const totalLiquidCapacity = useMemo(() => getTotalLiquidCapacity(itemsInPack), [itemsInPack]);

  const maxLiquidCapacity = liquidUnit.convert(totalLiquidCapacity);
  const currentLiquidCapacity = round(maxLiquidCapacity * fillPercentage);

  const maxLiquidWeight = weightUnit.convert(totalLiquidWeight);
  const currentLiquidWeight = round(maxLiquidWeight * fillPercentage);

  const itemAndPackWeight = totalWeight + (selectedPack?.weight || 0);
  const maxTotalWeight = weightUnit.convert(totalLiquidWeight + itemAndPackWeight);
  const currentTotalWeight = weightUnit.convert(
    totalLiquidWeight * fillPercentage + itemAndPackWeight
  );

  return (
    <Surface style={styles.container} elevation={0}>
      <View style={styles.header}>
        <View style={styles.rowLabel} />
        <Text variant="labelMedium" style={styles.headerCell}>
          Now
        </Text>
        <Text variant="labelMedium" style={styles.headerCell}>
          Full
        </Text>
      </View>
      <StatRow
        label="Liquid"
        now={`${currentLiquidCapacity} ${liquidUnit.label}`}
        full={`${maxLiquidCapacity} ${liquidUnit.label}`}
        first
      />
      <StatRow
        label="Liquid weight"
        now={`${currentLiquidWeight} ${weightUnit.label}`}
        full={`${maxLiquidWeight} ${weightUnit.label}`}
      />
      <StatRow
        label="Pack total"
        now={`${currentTotalWeight} ${weightUnit.label}`}
        full={`${maxTotalWeight} ${weightUnit.label}`}
        total
      />
    </Surface>
  );
}
