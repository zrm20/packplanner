const stockCategories: Category[] = [
  {
    value: 'food',
    label: 'Food',
    icon: 'food-drumstick',
    isBaseWeightExempt: true,
    isStockCategory: true
  },
  {
    value: 'water',
    label: 'Water Containers',
    icon: 'cup-water',
    isBaseWeightExempt: false,
    isStockCategory: true
  },
  {
    value: 'fuel',
    label: 'Fuel',
    icon: 'fuel',
    isBaseWeightExempt: true,
    isStockCategory: true
  },
  {
    value: 'shelter',
    label: 'Shelter',
    icon: 'tent',
    isBaseWeightExempt: false,
    isStockCategory: true
  },
  {
    value: 'clothing',
    label: 'Clothing',
    icon: 'tshirt-crew',
    isBaseWeightExempt: false,
    isStockCategory: true
  },
  {
    value: 'cooking',
    isBaseWeightExempt: false,
    label: 'Cooking',
    icon: 'grill',
    isStockCategory: true
  },
  {
    value: 'survival',
    label: 'Survival',
    isBaseWeightExempt: false,
    icon: 'knife-military',
    isStockCategory: true
  },
  {
    value: 'navigation',
    label: 'Navigation',
    isBaseWeightExempt: false,
    icon: 'map',
    isStockCategory: true
  },
  {
    value: 'health',
    label: 'Health',
    isBaseWeightExempt: false,
    icon: 'medical-bag',
    isStockCategory: true
  },
  {
    value: 'electronics',
    label: 'Electronics',
    isBaseWeightExempt: false,
    icon: 'battery-charging-100',
    isStockCategory: true
  },
  {
    value: 'misc',
    label: 'Misc',
    isBaseWeightExempt: false,
    icon: 'chart-bubble',
    isStockCategory: true
  }
];

export default stockCategories;