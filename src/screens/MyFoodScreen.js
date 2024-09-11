import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  
  export default function MyFoodScreen({ navigation }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const storedRecipes = await AsyncStorage.getItem("customRecipes");
          if (storedRecipes) {
            setRecipes(JSON.parse(storedRecipes));
          }
        } catch (error) {
          console.error("Failed to load recipes.", error);
        }
      };
  
      fetchRecipes();
    }, []);
  
    const handleAddRecipe = () => {
      navigation.navigate("CustomRecipeFormScreen", {
        onRecipeAdded: async () => {
          setLoading(true);
          try {
            const storedRecipes = await AsyncStorage.getItem("customRecipes");
            if (storedRecipes) {
              setRecipes(JSON.parse(storedRecipes));
            }
          } catch (error) {
            console.error("Failed to reload recipes.", error);
          } finally {
            setLoading(false);
          }
        },
      });
    };
  
    const handleRecipeClick = (recipe) => {
      navigation.navigate("CustomRecipes", { newRecipe: recipe });
    };
  
    const handleDeleteRecipe = async (index) => {
      Alert.alert("Delete Recipe", "Are you sure you want to delete this recipe?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const updatedRecipes = [...recipes];
              updatedRecipes.splice(index, 1);
              await AsyncStorage.setItem("customRecipes", JSON.stringify(updatedRecipes));
              setRecipes(updatedRecipes);
            } catch (error) {
              console.error("Failed to delete recipe.", error);
            }
          },
        },
      ]);
    };
  
    const handleEditRecipe = (recipe, index) => {
      navigation.navigate("CustomRecipeFormScreen", {
        recipeToEdit: recipe,
        recipeIndex: index,
        onRecipeEdited: async () => {
          setLoading(true);
          try {
            const storedRecipes = await AsyncStorage.getItem("customRecipes");
            if (storedRecipes) {
              setRecipes(JSON.parse(storedRecipes));
            }
          } catch (error) {
            console.error("Failed to reload recipes.", error);
          } finally {
            setLoading(false);
          }
        },
      });
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleAddRecipe} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Recipe</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="#f59e0b" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {recipes.length === 0 ? (
              <Text>No recipes added yet.</Text>
            ) : (
              recipes.map((recipe, index) => (
                <View key={index} style={styles.recipeCard}>
                  <TouchableOpacity onPress={() => handleRecipeClick(recipe)}>
                    {recipe.image && (
                      <Image
                        source={{ uri: recipe.image }}
                        style={styles.recipeImage}
                      />
                    )}
                    <Text style={styles.recipeTitle}>{recipe.foodName}</Text>
                    <Text>{recipe.ingredients.substring(0, 10) + "..."}</Text>
                    <Text>{recipe.instructions.substring(0, 10) + "..."}</Text>
                  </TouchableOpacity>
  
                  {/* Edit and Delete buttons */}
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => handleEditRecipe(recipe, index)} style={styles.editButton}>
                      <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteRecipe(index)} style={styles.deleteButton}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  addButton: {
    backgroundColor: "#f59e0b",
    padding: wp(2),
    marginTop: hp(4),
    alignItems: "center",
    borderRadius: 5,
    marginBottom: hp(2),
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingBottom: hp(2),
  },
  recipeCard: {
    backgroundColor: "#fff",
    padding: wp(4),
    borderRadius: 5,
    marginBottom: hp(2),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  recipeImage: {
    //   width: wp(100),
    height: hp(30),
    borderRadius: 5,
    marginBottom: hp(2),
  },
  recipeTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginVertical: hp(1),
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  editButton: {
    backgroundColor: "#6EE7B7",
    padding: wp(2),
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#F87171",
    padding: wp(2),
    borderRadius: 5,
  },
});
