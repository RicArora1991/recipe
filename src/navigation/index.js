import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import MyFoodScreen from "../screens/MyFoodScreen";
import CustomRecipes from "../screens/CustomRecipes";
import CustomRecipeFormScreen from "../screens/CustomRecipeFormScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="MyFood" component={MyFoodScreen} />
        <Stack.Screen name="CustomRecipes" component={CustomRecipes} />
        <Stack.Screen name="CustomRecipeFormScreen" component={CustomRecipeFormScreen} />
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
