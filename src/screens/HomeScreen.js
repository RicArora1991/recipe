// import { View, Text, ScrollView, Image, TextInput } from "react-native";
// import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import Categories from "../components/categories";
// import axios from "axios";
// import Recipes from "../components/recipes";
// export default function HomeScreen() {
//   const [activeCategory, setActiveCategory] = useState("Chicken");
//   const [categories, setCategories] = useState([]);
//   const [meals, setMeals] = useState([]);

//   useEffect(() => {
//     getCategories();
//     getRecipes();
//   }, []);

//   const handleChangeCategory = (category) => {
//     getRecipes(category);
//     setActiveCategory(category);
//     setMeals([]);
//   };

//   const getCategories = async () => {
//     try {
//       const response = await axios.get(
//         "https://themealdb.com/api/json/v1/1/categories.php"
//       );
//       if (response && response.data) {
//         setCategories(response.data.categories);
//       }
//     } catch (err) {
//       console.log("error: ", err.message);
//     }
//   };
//   const getRecipes = async (category = "Chicken") => {
//     try {
//       const response = await axios.get(
//         `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
//       );
//       if (response && response.data) {
//         setMeals(response.data.meals);
//       }
//     } catch (err) {
//       console.log("error: ", err.message);
//     }
//   };
//   return (
//     <View className="flex-1 bg-white">
//       <StatusBar style="dark" />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 50 }}
//         className="space-y-6 pt-14"
//       >
//         <View className="mx-4 flex-row justify-between items-center mb-2">
//           <Image
//             source={require("../../assets/images/avatar.png")}
//             style={{ height: hp(5), width: hp(5.5) }}
//           />
//           <Text
//             style={{ fontSize: hp(1.7) }}
//             className="text-neutral-600 font-semibold bg-gray-100 px-2 py-1 rounded-full text-center"
//           >
//             Hello, Richaaa!
//           </Text>
//           {/* <BellIcon size={hp(4)} color="gray" /> */}
//         </View>

//         <View className="mx-4 space-y-2 mb-2">
//           <View>
//             <Text
//               style={{ fontSize: hp(3.8) }}
//               className="font-semibold text-neutral-600"
//             >
//               Make your own food,
//             </Text>
//           </View>
//           <Text
//             style={{ fontSize: hp(3.8) }}
//             className="font-semibold text-neutral-600"
//           >
//             stay at <Text className="text-amber-400">home</Text>
//           </Text>
//         </View>

//         <View>
//           {categories.length > 0 && (
//             <Categories
//               categories={categories}
//               activeCategory={activeCategory}
//               handleChangeCategory={handleChangeCategory}
//             />
//           )}
//         </View>

//         <View>
//           <Recipes meals={meals} categories={categories} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Chicken");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const getRecipes = async (category = "Chicken") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <Text style={styles.greetingText}>Hello, Richaaa!</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Make your own food,</Text>
          <Text style={styles.subtitle}>
            stay at <Text style={styles.highlight}>home</Text>
          </Text>
        </View>

        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // white
  },
  scrollContainer: {
    paddingBottom: 50,
    paddingTop: hp(14), // pt-14 equivalent
  },
  headerContainer: {
    marginHorizontal: wp(4), // mx-4 equivalent
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    marginTop: hp(-8.5),
  },
  avatar: {
    height: hp(5),
    width: hp(5.5),
  },
  greetingText: {
    fontSize: hp(1.7),
    color: "#52525B", // neutral-600
    fontWeight: "600", // font-semibold
    backgroundColor: "#F3F4F6", // gray-100
    paddingHorizontal: wp(2), // px-2
    paddingVertical: hp(0.5), // py-1
    borderRadius: 9999, // full rounded
    textAlign: "center",
  },
  titleContainer: {
    marginHorizontal: wp(4), // mx-4
    marginBottom: hp(2), // mb-2
  },
  title: {
    fontSize: hp(3.8),
    fontWeight: "600", // font-semibold
    color: "#52525B", // neutral-600
  },
  subtitle: {
    fontSize: hp(3.8),
    fontWeight: "600", // font-semibold
    color: "#52525B", // neutral-600
  },
  highlight: {
    color: "#F59E0B", // amber-400
  },
});
