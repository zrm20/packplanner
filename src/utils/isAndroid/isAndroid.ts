import { Platform } from "react-native";

export default function isAndroid(): boolean {
  return Platform.OS === 'android';
};