import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { Button, Title } from "react-native-paper";

import { usePacks } from "../../../hooks";
import useThrowAlert from "../../../hooks/alerts/useThrowAlert";
import { LockerStackParamList } from "../../../navigation/navigation.types";
import { extractId } from "../../../utils";
import { ContainedModalTitle, SafeAreaScreen } from "../../ui";
import PackForm from "../PackForm/PackForm";
import useStyles from "./EditPackScreen.styles"

type EditPackScreenProps = NativeStackScreenProps<LockerStackParamList, 'EditPack'>;

export default function EditPackScreen({ route, navigation }: EditPackScreenProps): JSX.Element {
  const styles = useStyles();
  const { getPackById } = usePacks();
  const { catchUnknownError } = useThrowAlert();

  const packId = extractId(route.params.pack);
  // need to use getPackById to receive the full pack object with methods
  const pack = getPackById(packId);

  if (!pack) {
    <SafeAreaScreen style={styles.container}>
      <Title>Something went wrong</Title>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </SafeAreaScreen>
  }

  async function handleSubmit(newValues: PackFormData): Promise<void> {
    try {
      if (pack) {
        await pack.update(newValues);
        navigation.goBack();
      };
    } catch (err) {
      catchUnknownError(err, "Failed to update pack. Please try again.")
    }
  };

  async function handleDelete(): Promise<void> {
    try {
      if (pack) {
        await pack.delete();
        navigation.goBack()
      }
    } catch (err) {
      catchUnknownError(err, "Failed to delete pack. Please try again");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaScreen style={styles.container}>
        <ContainedModalTitle title="Edit Pack" />

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
