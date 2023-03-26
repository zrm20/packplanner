import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import { usePackModel } from "../../../hooks";
import useThrowAlert from "../../../hooks/alerts/useThrowAlert";
import { LockerStackParamList } from "../../../navigation/navigation.types";
import { ContainedModalTitle, SafeAreaScreen } from "../../ui";
import PackForm from "../PackForm/PackForm";
import useStyles from "./EditPackScreen.styles"

type EditPackScreenProps = NativeStackScreenProps<LockerStackParamList, 'EditPack'>;

export default function EditPackScreen({ route, navigation }: EditPackScreenProps): JSX.Element {
  const styles = useStyles();
  const { catchUnknownError } = useThrowAlert();
  const { pack } = route.params;
  const packModel = usePackModel(pack);


  async function handleSubmit(newValues: PackFormData): Promise<void> {
    try {
      await packModel.update(newValues);
      navigation.goBack();
    } catch (err) {
      catchUnknownError(err, "Failed to update pack. Please try again.")
    }
  };

  async function handleDelete(): Promise<void> {
    try {
      await packModel.delete();
      navigation.goBack();
    } catch (err) {
      catchUnknownError(err, "Failed to delete pack. Please try again");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaScreen style={styles.container}>
        <ContainedModalTitle title="Edit Pack" />
        {
          pack &&
          <PackForm
            onSubmit={handleSubmit}
            initialValues={pack}
            onDelete={handleDelete}
          />
        }
      </SafeAreaScreen>
    </TouchableWithoutFeedback>
  );
};
