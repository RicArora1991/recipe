import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CustomRecipeFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onRecipeEdited } = route.params || {};

  const [foodName, setFoodName] = useState(
    recipeToEdit ? recipeToEdit.foodName : ""
  );
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : null);
  const [ingredients, setIngredients] = useState(
    recipeToEdit ? recipeToEdit.ingredients : ""
  );
  const [instructions, setInstructions] = useState(
    recipeToEdit ? recipeToEdit.instructions : ""
  );

  const pickImage = async () => {
    // Request permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access the media library is required!");
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the image URI
    }
  };

  const saveRecipe = async () => {
    const newRecipe = { foodName, image, ingredients, instructions };
    try {
      const existingRecipes = await AsyncStorage.getItem("customRecipes");
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];

      if (recipeToEdit !== undefined) {
        // Update existing recipe
        recipes[recipeIndex] = newRecipe;
        await AsyncStorage.setItem("customRecipes", JSON.stringify(recipes));
        if (onRecipeEdited) onRecipeEdited();
      } else {
        // Add new recipe
        recipes.push(newRecipe);
        await AsyncStorage.setItem("customRecipes", JSON.stringify(recipes));
      }

      navigation.goBack();
    } catch (error) {
      console.error("Failed to save the recipe.", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Food Name"
        value={foodName}
        onChangeText={setFoodName}
        style={styles.input}
      />
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text>Upload Image</Text>
          )}
        </View>
      </TouchableOpacity>
      <TextInput
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        style={styles.input}
      />
      <TextInput
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        style={styles.input}
      />
      <TouchableOpacity onPress={saveRecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(2),
    marginVertical: hp(1),
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
  },
  image: {
    width: wp(100),
    height: hp(20),
    margin: wp(2),
  },
  saveButton: {
    backgroundColor: "#f59e0b",
    padding: wp(2),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
