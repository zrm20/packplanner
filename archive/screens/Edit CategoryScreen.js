import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import IconPicker from "../components/IconPicker";
import GenericButton from '../components/GenericButton';
import BasicSwitch from '../components/BasicSwitch'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/globalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, updateCategory, deleteCategory } from '../redux/CategoriesSlice';
import { iconsList } from '../assets/iconsList'
import { batchCategoryChange } from '../redux/InventorySlice'

//TODO When updating an existing category, need to change all items in that category to reflect liquidCapacity value

const iconDetails = iconsList;


export default function EditCategoryScreen({ navigation, route }) {

  //expects a category object in params
  const categoryToEdit = route.params;

  const categories = useSelector(state => state.categories.value);
  const dispatch = useDispatch();

  const initialName = categoryToEdit.label;
  const [categoryName, setCategoryName] = useState(categoryToEdit.label);
  const [baseWeightExempt, setBaseWeightExempt] = useState(categoryToEdit.baseWeightExempt);
  const [holdsLiquid, setholdsLiquid] = useState(categoryToEdit.holdsLiquid);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [icon, setIcon] = useState(categoryToEdit.icon);

  function selectIcon(icon) {
    setIcon(icon.icon);
    setShowIconPicker(false);
  }

  //function to convert to camel case via Stack Overflow
  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  function submitCategory(oldKey, newKey) {
    const newCategoryPayload = {
      key: newKey,
      newCategory: {
        label: categoryName,
        icon: icon,
        baseWeightExempt: baseWeightExempt,
        holdsLiquid: holdsLiquid
      }
    };

    if (oldKey === newKey) {
      dispatch(updateCategory(newCategoryPayload));
      navigation.navigate('Edit Categories');
    } else {
      dispatch(addCategory(newCategoryPayload));
      dispatch(batchCategoryChange({ categoryToChange: oldKey, newCategory: newKey }));
      dispatch(deleteCategory(oldKey));
      navigation.navigate('Edit Categories');
    }
  };

  //function that checks if the name is in use already. Runs submit Category if everything is good
  function validateName() {
    const oldKey = camelize(initialName);
    const newKey = camelize(categoryName);

    if (!categoryName) {
      Alert.alert("Must include a category name");
    } else if (categories[newKey]) {
      Alert.alert("That category name already exists", "Would you like to update the existing category?",
        [
          {
            text: 'Update',
            onPress: () => submitCategory(oldKey, newKey)
          },
          {
            text: 'Cancel',
          }
        ]
      )
    }
    else {
      submitCategory(oldKey, newKey);
    }
  }

  function removeCategory() {
    const keyName = camelize(initialName);

    const inventoryPayload = {
      categoryToChange: camelize(initialName),
      newCategory: 'misc'
    };

    dispatch(batchCategoryChange(inventoryPayload));
    dispatch(deleteCategory(keyName));
    navigation.navigate('Edit Categories');
  };

  function verifyDelete() {
    const buttonOptions = [
      {
        text: 'Delete',
        onPress: removeCategory
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancelled!')
      }
    ]

    Alert.alert("Are you sure?", "Do you want to perminantly delete this category?", buttonOptions)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
      <View style={styles.form}>
        <Text style={styles.textInputLabel}>Category Name</Text>
        <TextInput
          style={styles.textInput}
          value={categoryName}
          onChangeText={setCategoryName} />
        <BasicSwitch
          name="Exempt from base weight?"
          value={baseWeightExempt}
          setValue={setBaseWeightExempt}
        />
        <Text style={styles.alertText}>{baseWeightExempt ? 'Items will NOT count towards base weight' : 'Items WILL count towards base weight'}</Text>

        <BasicSwitch
          name="Holds Liquid?"
          value={holdsLiquid}
          setValue={setholdsLiquid}
        />
        <Text style={styles.alertText}>{holdsLiquid ? 'Items WILL hold liquid' : 'Items will NOT hold liquid'}</Text>

        <View style={styles.iconSection}>
          <IconPicker
            iconList={iconsList}
            visible={showIconPicker}
            onClose={() => setShowIconPicker(false)}
            onSelect={setIcon}
            animationType="slide"
          />

          {
            !showIconPicker &&
            <GenericButton name='Select Icon' size={24} pressHandler={() => setShowIconPicker(true)} />
          }


          <MaterialCommunityIcons name={icon} size={100} color={colors.color4} />
        </View>
      </View>
      <GenericButton name='Update Category' size={30} pressHandler={validateName} />
      <GenericButton name='Remove Category' size={30} pressHandler={verifyDelete} />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color3,
    padding: 5,
    alignItems: 'center'
  },
  form: {
    width: '100%',
    padding: 10
  },
  textInputLabel: {
    color: colors.white,
    fontSize: 20,
    marginTop: 8
  },
  textInput: {
    height: 40,
    width: '100%',
    backgroundColor: colors.color5,
    borderRadius: 5,
    marginVertical: 5
  },
  alertText: {
    color: colors.color1,
    fontSize: 20,
    margin: 3
  },
  iconSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
