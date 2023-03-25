import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { Title } from "react-native-paper";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { LockerStackParamList } from "../../../navigation/navigation.types";
import { CloseScreenButton, SafeAreaScreen } from "../../ui";
import { usePacks } from "../../../hooks";
import PackForm from "../PackForm/PackForm";
import useStyles from "./NewPackScreen.styles";
import useThrowAlert from "../../../hooks/alerts/useThrowAlert";

type NewPackScreenProps = NativeStackScreenProps<LockerStackParamList, 'NewPack'>;

export default function NewPackScreen({ navigation }: NewPackScreenProps): JSX.Element {
  const styles = useStyles();
  const { addPack } = usePacks();
  const { catchUnknownError } = useThrowAlert();

  async function handleSubmit(pack: PackData): Promise<void> {
    try {
      await addPack(pack);
      navigation.goBack();
    } catch (err) {
      catchUnknownError(err, "Failed to add pack, please try again");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaScreen style={styles.container} >
        <View style={styles.titleContainer}>
          <CloseScreenButton style={styles.closeButton}  />
          <Title>New Pack</Title>
        </View>

        <PackForm onSubmit={handleSubmit} />
      </SafeAreaScreen>
    </TouchableWithoutFeedback>
  );
};
