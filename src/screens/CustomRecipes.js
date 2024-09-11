import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeIn } from "react-native-reanimated";
import { addToFavorites, removeFromFavorites } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function CustomRecipes(props) {
  let item = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();
  const { newRecipe } = route.params || {};
  const favoriteMeals = useSelector((state) => state.favorites.favoriteMeals);
  const isFavourite = favoriteMeals.includes(item.idMeal);

  if (!newRecipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Recipe Details Available</Text>
      </View>
    );
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(item.idMeal)); // Toggle the favorite status
  };
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Recipe Image */}
      <View style={styles.imageContainer}>
        {newRecipe.image && (
          <Image source={{ uri: newRecipe.image }} style={styles.recipeImage} />
        )}
      </View>
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        style={styles.topButtonsContainer}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
        >
          <Text>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Recipe Details */}
      <View style={styles.contentContainer}>
        {/* Recipe Name */}
        <Text style={styles.recipeName}>{newRecipe.foodName}</Text>

        {/* Ingredients */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList}>
            {newRecipe.ingredients?.split(/,\s*/).map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientBullet} />
                <View style={styles.ingredientTextContainer}>
                  <Text style={styles.ingredientName}>
                    {ingredient.trim()}{" "}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>{newRecipe.instructions}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  recipeImage: {
    width: wp(98),
    height: hp(50),
    borderRadius: 35,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 4,
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  recipeName: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
    marginBottom: hp(2),
  },
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
    marginBottom: hp(1),
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    marginLeft: wp(5),
    backgroundColor: "white",
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
    marginRight: wp(5),
    backgroundColor: "white",
  },
  ingredientsList: {
    marginLeft: wp(2),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
  },
  ingredientBullet: {
    backgroundColor: "#FBBF24", // bg-amber-300
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
  },
  ingredientTextContainer: {
    flexDirection: "row",
    marginLeft: wp(2),
  },
  ingredientName: {
    fontSize: hp(1.7),
    fontWeight: "500",
    color: "#6B7280", // text-neutral-600
  },
  instructionsText: {
    fontSize: hp(1.6),
    color: "#4B5563", // text-neutral-700
  },
});
