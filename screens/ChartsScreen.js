import React from 'react'
import { View, Text , StyleSheet} from 'react-native'
import { colors } from '../styles/globalStyles';

export default function ChartsScreen() {
  return (
    <View style={styles.container}>
      <Text>Charts Screen</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});
