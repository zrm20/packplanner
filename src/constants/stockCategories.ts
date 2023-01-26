const stockCategories: CategoryData[] = [
  {
    id: '01',
    value: 'food',
    label: 'Food',
    icon: 'food-drumstick',
    isBaseWeightExempt: true,
  },
  {
    id: '02',
    value: 'water',
    label: 'Water Containers',
    icon: 'cup-water',
    isBaseWeightExempt: false,
  },
  {
    id: '03',
    value: 'fuel',
    label: 'Fuel',
    icon: 'fuel',
    isBaseWeightExempt: true,
  },
  {
    id: '04',
    value: 'shelter',
    label: 'Shelter',
    icon: 'tent',
    isBaseWeightExempt: false,
  },
  {
    id: '04',
    value: 'clothing',
    label: 'Clothing',
    icon: 'tshirt-crew',
    isBaseWeightExempt: false,
  },
  {
    id: '05',
    value: 'cooking',
    isBaseWeightExempt: false,
    label: 'Cooking',
    icon: 'grill',
  },
  {
    id: '06',
    value: 'survival',
    label: 'Survival',
    isBaseWeightExempt: false,
    icon: 'knife-military',
  },
  {
    id: '07',
    value: 'navigation',
    label: 'Navigation',
    isBaseWeightExempt: false,
    icon: 'map',
  },
  {
    id: '08',
    value: 'health',
    label: 'Health',
    isBaseWeightExempt: false,
    icon: 'medical-bag',
  },
  {
    id: '09',
    value: 'electronics',
    label: 'Electronics',
    isBaseWeightExempt: false,
    icon: 'battery-charging-100',
  },
  {
    id: '10',
    value: 'misc',
    label: 'Misc',
    isBaseWeightExempt: false,
    icon: 'chart-bubble',
  }
];

export const stockCategoriesList: string[] = stockCategories.map(category => category.value);

export default stockCategories;