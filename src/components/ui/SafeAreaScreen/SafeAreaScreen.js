import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

import { isAndroid } from "../../../utils";


export default function SafeAreaScreen({ children, alignCenter = false, justifyCenter = false, ...props }) {
  const styles = StyleSheet.create(
    {
      container: {
        marginTop: isAndroid() ? StatusBar.currentHeight : 0,
        flex: 1,
        alignItems: alignCenter ? 'center' : null,
        justifyContent: justifyCenter ? 'center' : null
      }
    }
  );

  return (
    <SafeAreaView {...props} style={[styles.container, props.style]}>
      {children}
    </SafeAreaView>
  )
};