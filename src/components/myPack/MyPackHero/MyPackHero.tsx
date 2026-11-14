import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';

import useStyles from './MyPackHero.styles';
import trailheadTopo from './trailheadTopo';
import { useInventory, usePacks, useSettings } from '../../../hooks';
import { getTotalLiquidWeight, getTotalWeight } from '../../../utils/inventoryUtils/inventoryUtils';

interface MyPackHeroProps {
  style?: ViewStyle;
}

function displayedWeight(kilograms: number, convert: (kilograms: number) => number): number {
  return Math.round(convert(kilograms) * 100) / 100;
}

export default function MyPackHero(props: MyPackHeroProps): JSX.Element {
  const styles = useStyles();
  const { weightUnit } = useSettings();
  const { selectedPack } = usePacks();
  const { itemsInPack, getBaseWeightItems } = useInventory();

  const packWeight = selectedPack?.weight || 0;
  const baseWeight = packWeight + getTotalWeight(getBaseWeightItems(itemsInPack));

  const displayedBaseWeight = displayedWeight(baseWeight, weightUnit.convert);

  return (
    <View style={[styles.hero, props.style]}>
      <View
        style={styles.topo}
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants">
        <SvgXml
          xml={trailheadTopo}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
      </View>

      <View style={styles.identity}>
        <View style={styles.iconTile}>
          <Icon source="bag-personal" size={22} color={styles.icon.color as string} />
        </View>
        <View style={styles.identityText}>
          {selectedPack ? (
            <>
              <Text variant="labelMedium" style={styles.brand} numberOfLines={1}>
                {selectedPack.brand}
              </Text>
              <Text variant="headlineSmall" style={styles.model} numberOfLines={1}>
                {selectedPack.model}
              </Text>
            </>
          ) : (
            <>
              <Text variant="titleMedium" style={styles.model}>
                No Pack Selected
              </Text>
              <Text variant="bodyMedium" style={styles.brand}>
                Select a pack by tapping on a pack in the Locker Tab
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.baseLabelPlate}>
        <Text variant="labelSmall" style={styles.baseLabel}>
          Base weight
        </Text>
      </View>
      <View style={styles.headline}>
        <Text variant="displayMedium" style={styles.figure}>
          {displayedBaseWeight}
        </Text>
        <Text variant="titleMedium" style={styles.unit}>
          {weightUnit.label}
        </Text>
      </View>
    </View>
  );
}

export function MyPackTotals(): JSX.Element {
  const styles = useStyles();
  const { weightUnit } = useSettings();
  const { selectedPack } = usePacks();
  const { itemsInPack } = useInventory();
  const totalWeight = (selectedPack?.weight || 0) + getTotalWeight(itemsInPack);
  const weightWithLiquid = totalWeight + getTotalLiquidWeight(itemsInPack);
  const displayedTotalWeight = displayedWeight(totalWeight, weightUnit.convert);
  const displayedWeightWithLiquid = displayedWeight(weightWithLiquid, weightUnit.convert);

  return (
    <View style={styles.totalsBackground}>
      <View style={styles.totals}>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text variant="labelMedium" style={styles.statLabel}>
              Total
            </Text>
            <Text variant="titleSmall" style={styles.statValue}>
              {displayedTotalWeight} {weightUnit.label}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text variant="labelMedium" style={styles.statLabel}>
              With liquid
            </Text>
            <Text variant="titleSmall" style={styles.statValue}>
              {displayedWeightWithLiquid} {weightUnit.label}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text variant="labelMedium" style={styles.statLabel}>
              Capacity
            </Text>
            <Text variant="titleSmall" style={styles.statValue}>
              {selectedPack ? `${selectedPack.capacity} L` : '—'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
