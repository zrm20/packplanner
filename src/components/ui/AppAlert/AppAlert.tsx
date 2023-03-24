import React from "react";
import { Button, Dialog, Portal, Snackbar, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { clearAlert } from "../../../redux/alertSlice";
import { useSelector } from "../../../redux/reduxHooks";

import useStyles from "./AppAlert.styles";


export default function AppAlert(): JSX.Element {
  const alert = useSelector(state => state.alert.alert);
  const dispatch = useDispatch();
  const styles = useStyles(alert);

  function handleClearAlert() {
    dispatch(clearAlert());
  };

  function titleText() {
    switch(alert?.type) {
      case "info": return "Info";
      case "warning": return "Warning";
      case "error": return "Error";
      default: "Info"
    };
  };

  return (
    <Portal>
      <Dialog visible={Boolean(alert)} onDismiss={handleClearAlert} style={styles.container}>
        <Dialog.Title style={styles.title}>{alert?.title || titleText()}</Dialog.Title>
        <Dialog.Content>
          {
            Boolean(alert?.code) &&
            <Text style={styles.codeText}>Code: [{alert!.code}]</Text>
          }
          <Text style={styles.messageText}>{alert?.message}</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.actionsContainer}>
          <Button onPress={handleClearAlert}>Dismiss</Button>
          {
            Boolean(alert?.buttonText) && 
            <Button onPress={alert?.action} labelStyle={styles.button}>{alert?.buttonText}</Button>
          }
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
};