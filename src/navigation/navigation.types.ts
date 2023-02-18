import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabNavigationOptions, BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";

// describes the list of tabs in the apps root navigator
export type RootTabParamList = {
  Locker: NavigatorScreenParams<LockerStackParamList>;
  MyPack: NavigatorScreenParams<MyPackStackParamList>;
  Water: NavigatorScreenParams<undefined>;
  Categories: NavigatorScreenParams<CategoriesStackParamList>;
  Settings: undefined;
};


// describes the object used to create a screen on the tab navigator
export interface AppTab {
  name: keyof RootTabParamList;
  component(props: any): JSX.Element;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  screenOptions?: BottomTabNavigationOptions
};


// describes the array of tabs used to create screens on the tab navigator
export type AppTabs = AppTab[];

// describes the params used on each screen in the locker stack
export type LockerStackParamList = {
  Inventory: undefined;
  NewPack: undefined;
  EditPack: { pack: PackData | string };
  NewItem: undefined;
  EditItem: { item: ItemData | string };
};

export type MyPackStackParamList = {
  MyPackHome: undefined,
  Checklist: undefined,
  Chart: undefined
};

export type CategoriesStackParamList = {
  CategoriesHome: undefined
};

export type MyPackHomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MyPackStackParamList, 'MyPackHome'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type RootNavigationProps = BottomTabNavigationProp<RootTabParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList { }
  }
};