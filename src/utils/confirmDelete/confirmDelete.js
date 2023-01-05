import { Alert } from "react-native";

export default function confirmDelete(deleteFn, message = "Do you want to perminantly delete this?", callback) {
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
        text: "Delete item",
        onPress: () => {
          deleteFn();
          if (callback) {
            callback();
          };
        },
        style: 'destructive' // iOS only
      }
    ]
  );
};