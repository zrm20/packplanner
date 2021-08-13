import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function Icon({ image, size = 50 }) {
   
  return (

    <Image source={image} style={{height: size, width: size}}/>
  )
};
