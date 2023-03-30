import { useField } from 'formik';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Surface, Subheading, HelperText, Switch } from 'react-native-paper';

import useStyles from './InventoryForm.styles';
import { CapacityInput } from '../../formComponents';

export default function ShowLiquidInput(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, utils] = useField('liquidCapacity');
  const [showLiquid, setShowLiquid] = useState<boolean>(Boolean(field.value));
  const styles = useStyles();

  function toggleShowLiquid() {
    if (showLiquid) {
      utils.setValue(0);
    }

    setShowLiquid((state) => !state);
  }

  return (
    <>
      <View style={styles.liquidEnableSection}>
        <Subheading style={styles.enableLiquidLabel}>Liquid Container?</Subheading>
        <Switch value={showLiquid} onValueChange={toggleShowLiquid} />
      </View>

      {showLiquid && (
        <Surface style={styles.liquidSection}>
          <Subheading style={styles.liquidTitle}>Liquid Capacity</Subheading>
          <HelperText type="info">
            Items such as water bottles have a liquid capacity property. The weight of the item
            should be the weight of the empty container. The weight of the liquid will be
            automatically calculated.
          </HelperText>
          <CapacityInput name="liquidCapacity" label="Liquid Capacity" />
        </Surface>
      )}
    </>
  );
}
