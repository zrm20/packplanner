import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { Button, Title } from "react-native-paper";

import { usePacks } from "../../../hooks";
import { LockerStackParamList } from "../../../navigation/navigation.types";
import { extractId } from "../../../utils";
import { CloseScreenButton, SafeAreaScreen } from "../../ui";
import PackForm from "../PackForm/PackForm";
import useStyles from "./EditPackScreen.styles"

type EditPackScreenProps = NativeStackScreenProps<LockerStackParamList, 'EditPack'>;

export default function EditPackScreen({ route, navigation }: EditPackScreenProps): JSX.Element {
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

  function handleSubmit(newValues: PackFormData): void {
    if (pack) {
      pack.update(newValues, navigation.goBack);
    };
  };

  function handleDelete(): void {
    if (pack) {
      pack.delete(navigation.goBack);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaScreen style={styles.container}>
        <View style={styles.titleContainer}>
          <CloseScreenButton androidOnly />

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
