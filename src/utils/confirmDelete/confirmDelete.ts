import { Alert } from "react-native";

export default function confirmDelete<T = void>(
  deleteFn: () => T,
  message: string = "Do you want to permanently delete this?",
  callback?: Function): void {

  async function callDelete() {
    await deleteFn();
    if (callback) {
      callback();
    };
  };

  Alert.alert(
    "Are you sure?", // Alert title
    message, // Alert message
    [
      {
        // first button option
        text: "Cancel",
        onPress: () => null,
        style: 'cancel' // iOS only
      },
      {
        // second button option
        text: "Remove",
        onPress: callDelete,
        style: 'destructive' // iOS only
      }
    ]
  );
};