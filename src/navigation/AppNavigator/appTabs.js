import { InventoryScreen } from "../../components/inventory";

const appTabs = {
  "Locker": {
    component: InventoryScreen,
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