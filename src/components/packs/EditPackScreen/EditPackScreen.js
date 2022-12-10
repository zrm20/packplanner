import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { Button, FAB, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import useDeletePack from "../../../hooks/packs/useDeletePack";

import { updatePack } from "../../../redux/packsSlice";
import { isAndroid } from "../../../utils";
import { SafeAreaScreen } from "../../ui";
import PackForm from "../PackForm/PackForm";
import useStyles from "./EditPackScreen.styles"

export default function EditPackScreen({ route, navigation, ...props }) {
  const styles = useStyles();
  const deletePack = useDeletePack();
  const dispatch = useDispatch();

  const { pack } = route.params;

  if (!pack) {
    <SafeAreaScreen style={styles.container}>
      <Title>Something went wrong</Title>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </SafeAreaScreen>
  }

  function handleSubmit(pack) {
    dispatch(updatePack({ pack }));
    navigation.goBack();
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

        <PackForm
          onSubmit={handleSubmit}
          initialValues={{ ...pack }}
          submitText="Update Pack"
        />

        <View style={styles.deleteContainer}>
          <Button
            style={styles.deleteButton}
            mode="contained"
            onPress={() => deletePack(pack)}
          >
            Delete Pack
          </Button>
        </View>
      </SafeAreaScreen>
    </TouchableWithoutFeedback>
  );
};
