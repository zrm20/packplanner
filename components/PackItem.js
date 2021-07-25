import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles'
import { useDispatch } from 'react-redux'
import { setActivePack } from '../redux/PacksSlice';


export default function PackItem({ pack }) {

  const dispatch = useDispatch();

  return (
    <TouchableOpacity 
      style={pack.isActivePack ? styles.activeContainer : styles.container}
      onPress={() => dispatch(setActivePack(pack.id))}
      >
      <Text style={styles.brandText}>{pack.brand}</Text>
      <Text style={styles.modelText}>{pack.model}</Text>
      {pack.capacity ? <Text style={styles.dataText}>{pack.capacity} L</Text> : null}
      {pack.weight ? <Text style={styles.dataText}>{pack.weight} lbs</Text> : null}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    marginHorizontal: 5,
    padding: 2,
    backgroundColor: colors.color4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  activeContainer: {
    height: 100,
    width: 100,
    marginHorizontal: 5,
    padding: 2,
    backgroundColor: colors.color4,
    borderColor: colors.color1,
    borderWidth: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  brandText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.color1,
    textAlign: 'center'
  },
  modelText: {
    fontSize: 14,
    color: colors.color5,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  dataText: {
    textAlign: 'center',
    fontSize: 11,
    color: colors.white
  }
});
