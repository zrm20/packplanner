import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { Button, FAB, Title } from "react-native-paper";

import { usePacks } from "../../../hooks";
import { extractId, isAndroid } from "../../../utils";
import { SafeAreaScreen } from "../../ui";
import PackForm from "../PackForm/PackForm";
import useStyles from "./EditPackScreen.styles"

export default function EditPackScreen({ route, navigation, ...props }) {
  const styles = useStyles();
  const { getPackById } = usePacks();

  const packId = extractId(route.params.pack);
  // need to use getPackById to recieve the full pack object with methods
  const pack = getPackById(packId);

  if (!pack) {
    <SafeAreaScreen style={styles.container}>
      <Title>Something went wrong</Title>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </SafeAreaScreen>
  }

  function handleSubmit(newValues) {
    pack.update(newValues, navigation.goBack);
  };

  function handleDelete() {
    pack.delete(() => navigation.navigate("Locker"));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaScreen style={styles.container}>
        <View style={styles.titleContainer}>
          {
            isAndroid() &&
            <FAB
              icon="arrow-left"
              onPress={() => navigation.goBack()}
              style={styles.closeButton}
              size="small"
            />
          }

          <Title>Edit Pack</Title>
        </View>

        {
          pack?.baseFields &&
          <PackForm
            onSubmit={handleSubmit}
            initialValues={pack.baseFields}
            submitText="Update Pack"
          />
        }

        <View style={styles.deleteContainer}>
          <Button
            style={styles.deleteButton}
            mode="contained"
            onPress={handleDelete}
          >
            Delete Pack
          </Button>
        </View>
      </SafeAreaScreen>
    </TouchableWithoutFeedback>
  );
};
