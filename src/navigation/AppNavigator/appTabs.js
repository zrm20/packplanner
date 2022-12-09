import LockerStack from "../LockerStack/LockerStack";
import { InventoryScreen } from "../../components/inventory";

const appTabs = {
  "Inventory": {
    component: LockerStack,
    iconName: "locker"
  },
  "MyPack": {
    component: InventoryScreen,
    iconName: "bag-personal"
  },
  "Water": {
    component: InventoryScreen,
    iconName: "cup-water"
  },
  "Categories": {
    component: InventoryScreen,
    iconName: "tag-multiple"
  },
  "Settings": {
    component: InventoryScreen,
    iconName: "cog"
  },
};

export default appTabs;