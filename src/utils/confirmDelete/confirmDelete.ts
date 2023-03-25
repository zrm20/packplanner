import { Alert } from "react-native";


export default function confirmDelete(
  deleteFn: Function,
  message: string = "Do you want to permanently delete this?",
  callback?: Function): void {

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
        onPress: async () => {
          await deleteFn();
          if (callback) {
            callback();
          };
        },
        style: 'destructive' // iOS only
      }
    ]
  );
};