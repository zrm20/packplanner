import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

export default function GenericButton({ pressHandler, name, size = 24, ...props }) {
  const styles = useStyles(size);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => pressHandler()}
      {...props}
    >
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  )
}

const useStyles = (size) => (StyleSheet.create({
  container: {
    height: (size * 3),
    paddingHorizontal: (size * .625),
    borderColor: colors.color1,
    borderWidth: (size * .1666666),
    borderRadius: (size * .6),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color3,
    margin: (size * .25)
  },
  buttonText: {
    color: colors.color2,
    fontSize: size,
    marginHorizontal: (size * .25)
  }
}));
