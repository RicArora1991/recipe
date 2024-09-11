// import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
// import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
// import { CachedImage } from "../helpers/image";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// // import {
// //   ChevronLeftIcon,
// //   ClockIcon,
// //   FireIcon,
// // } from "react-native-heroicons/outline";
// // import {
// //   HeartIcon,
// //   Square3Stack3DIcon,
// //   UsersIcon,
// // } from "react-native-heroicons/solid";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import Loading from "../components/loading";
// import YouTubeIframe from "react-native-youtube-iframe";
// import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

// export default function RecipeDetailScreen(props) {
//   let item = props.route.params;
//   const [isFavourite, setIsFavourite] = useState(false);
//   const navigation = useNavigation();
//   const [meal, setMeal] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getMealData(item.idMeal);
//   }, []);

//   const getMealData = async (id) => {
//     try {
//       const response = await axios.get(
//         `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
//       );
//       //   console.log('got meal data: ',response.data);
//       if (response && response.data) {
//         setMeal(response.data.meals[0]);
//         setLoading(false);
//       }
//     } catch (err) {
//       console.log("error: ", err.message);
//     }
//   };

//   const ingredientsIndexes = (meal) => {
//     if (!meal) return [];
//     let indexes = [];
//     for (let i = 1; i <= 20; i++) {
//       if (meal["strIngredient" + i]) {
//         indexes.push(i);
//       }
//     }

//     return indexes;
//   };

//   const getYoutubeVideoId = (url) => {
//     const regex = /[?&]v=([^&]+)/;
//     const match = url.match(regex);
//     if (match && match[1]) {
//       return match[1];
//     }
//     return null;
//   };

//   return (
//     <ScrollView
//       className="bg-white flex-1"
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ paddingBottom: 30 }}
//     >
//       <StatusBar style={"light"} />
//       {/* recipe image */}
//       <View className="flex-row justify-center">
//         <Image
//           source={{ uri: item.strMealThumb }}
//           style={{
//             width: wp(98),
//             height: hp(50),
//             borderRadius: 35,
//             borderBottomLeftRadius: 40,
//             borderBottomRightRadius: 40,
//             marginTop: 4,
//           }}
//         />
//       </View>

//       {/* back button */}
//       <Animated.View
//         entering={FadeIn.delay(200).duration(1000)}
//         className="w-full absolute flex-row justify-between items-center pt-14"
//       >
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           className="p-2 rounded-full ml-5 bg-white"
//         >
//           <Text>Back</Text>
//           {/* <Text>←</Text> */}
//           {/* <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" /> */}
//         </TouchableOpacity>
// <TouchableOpacity
//   onPress={() => setIsFavourite(!isFavourite)}
//   className="p-2 rounded-full mr-5 bg-white"
//   // syle with border radius in circle?
//   style={{
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: isFavourite ? "red" : "gray",
//   }}
// >
//   <Text>♥</Text>
//   {/* <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? "red": "gray"} /> */}
// </TouchableOpacity>
//       </Animated.View>

//       {/* meal description */}
//       {loading ? (
//         <Loading size="large" className="mt-16" />
//       ) : (
//         <View className="px-4 flex justify-between space-y-4 pt-8">
//           {/* name and area */}
//           <Animated.View
//             entering={FadeInDown.duration(700).springify().damping(12)}
//             className="space-y-2"
//           >
//             <Text
//               style={{ fontSize: hp(3) }}
//               className="font-bold flex-1 text-neutral-700"
//             >
//               {meal?.strMeal}
//             </Text>
//             <Text
//               style={{ fontSize: hp(2) }}
//               className="font-medium flex-1 text-neutral-500"
//             >
//               {meal?.strArea}
//             </Text>
//           </Animated.View>

//           {/* misc */}
//           <Animated.View
//             entering={FadeInDown.delay(100)
//               .duration(700)
//               .springify()
//               .damping(12)}
//             className="flex-row justify-around"
//           >
//             <View className="flex rounded-full bg-amber-300 p-2">
//               <View
//                 style={{ height: hp(6.5), width: hp(6.5) }}
//                 className="bg-white rounded-full flex items-center justify-center"
//               >
//                 {/* <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" /> */}
//                 <Text>🕒</Text>
//               </View>
//               <View className="flex items-center py-2 space-y-1">
//                 <Text
//                   style={{ fontSize: hp(2) }}
//                   className="font-bold text-neutral-700"
//                 >
//                   35
//                 </Text>
//                 <Text
//                   style={{ fontSize: hp(1.3) }}
//                   className="font-bold text-neutral-700"
//                 >
//                   Mins
//                 </Text>
//               </View>
//             </View>
//             <View className="flex rounded-full bg-amber-300 p-2">
//               <View
//                 style={{ height: hp(6.5), width: hp(6.5) }}
//                 className="bg-white rounded-full flex items-center justify-center"
//               >
//                 {/* <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" /> */}
//                 <Text>👥</Text>
//               </View>
//               <View className="flex items-center py-2 space-y-1">
//                 <Text
//                   style={{ fontSize: hp(2) }}
//                   className="font-bold text-neutral-700"
//                 >
//                   03
//                 </Text>
//                 <Text
//                   style={{ fontSize: hp(1.3) }}
//                   className="font-bold text-neutral-700"
//                 >
//                   Servings
//                 </Text>
//               </View>
//             </View>
//             <View className="flex rounded-full bg-amber-300 p-2">
//               <View
//                 style={{ height: hp(6.5), width: hp(6.5) }}
//                 className="bg-white rounded-full flex items-center justify-center"
//               >
//                 {/* <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" /> */}
//                 <Text>🔥</Text>
//               </View>
//               <View className="flex items-center py-2 space-y-1">
//                 <Text
//                   style={{ fontSize: hp(2) }}
//                   className="font-bold text-neutral-700"
//                 >
//                   103
//                 </Text>
//                 <Text
//                   style={{ fontSize: hp(1.3) }}
//                   className="font-bold text-neutral-700"
//                 >
//                   Cal
//                 </Text>
//               </View>
//             </View>
//             <View className="flex rounded-full bg-amber-300 p-2">
//               <View
//                 style={{ height: hp(6.5), width: hp(6.5) }}
//                 className="bg-white rounded-full flex items-center justify-center"
//               >
//                 {/* <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" /> */}
//                 <Text>🔒</Text>
//               </View>
//               <View className="flex items-center py-2 space-y-1">
//                 <Text
//                   style={{ fontSize: hp(2) }}
//                   className="font-bold text-neutral-700"
//                 ></Text>
//                 <Text
//                   style={{ fontSize: hp(1.3) }}
//                   className="font-bold text-neutral-700"
//                 >
//                   Easy
//                 </Text>
//               </View>
//             </View>
//           </Animated.View>

//           {/* ingredients */}
//           <Animated.View
//             entering={FadeInDown.delay(200)
//               .duration(700)
//               .springify()
//               .damping(12)}
//             className="space-y-4"
//           >
//             <Text
//               style={{ fontSize: hp(2.5) }}
//               className="font-bold flex-1 text-neutral-700"
//             >
//               Ingredients
//             </Text>
//             <View className="space-y-2 ml-3">
//               {ingredientsIndexes(meal).map((i) => {
//                 return (
//                   <View key={i} className="flex-row space-x-4">
//                     <View
//                       style={{ height: hp(1.5), width: hp(1.5) }}
//                       className="bg-amber-300 rounded-full"
//                     />
//                     <View className="flex-row space-x-2">
//                       <Text
//                         style={{ fontSize: hp(1.7) }}
//                         className="font-extrabold text-neutral-700"
//                       >
//                         {meal["strMeasure" + i]}
//                       </Text>
//                       <Text
//                         style={{ fontSize: hp(1.7) }}
//                         className="font-medium text-neutral-600"
//                       >
//                         {meal["strIngredient" + i]}
//                       </Text>
//                     </View>
//                   </View>
//                 );
//               })}
//             </View>
//           </Animated.View>
//           {/* instructions */}
//           <Animated.View
//             entering={FadeInDown.delay(300)
//               .duration(700)
//               .springify()
//               .damping(12)}
//             className="space-y-4"
//           >
//             <Text
//               style={{ fontSize: hp(2.5) }}
//               className="font-bold flex-1 text-neutral-700"
//             >
//               Instructions
//             </Text>
//             <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
//               {meal?.strInstructions}
//             </Text>
//           </Animated.View>

//           {/* recipe video */}
//           {meal.strYoutube && (
//             <Animated.View
//               entering={FadeInDown.delay(400)
//                 .duration(700)
//                 .springify()
//                 .damping(12)}
//               className="space-y-4"
//             >
//               <Text
//                 style={{ fontSize: hp(2.5) }}
//                 className="font-bold flex-1 text-neutral-700"
//               >
//                 Recipe Video
//               </Text>
//               <View>
//                 <YouTubeIframe
//                   videoId={getYoutubeVideoId(meal.strYoutube)}
//                   height={hp(30)}
//                 />
//               </View>
//             </Animated.View>
//           )}
//         </View>
//       )}
//     </ScrollView>
//   );
// }

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import YouTubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { toggleFavorite } from "../redux/favoritesSlice"; // Redux action
export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState(null);

  const dispatch = useDispatch();
  const favoriteMeals = useSelector((state) => state.favorites.favoriteMeals);
  const isFavourite = favoriteMeals.includes(item.idMeal);

  const navigation = useNavigation();

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(item.idMeal)); // Toggle the favorite status
  };
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <StatusBar style={"light"} />

      {/* Recipe Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.strMealThumb }} style={styles.recipeImage} />
      </View>

      {/* Back Button and Favorite Button */}
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
          style={[
            styles.favouriteButton,
            {
              backgroundColor: "white",
            },
          ]}
        >
          <Text>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Meal Description */}
      {loading ? (
        <Loading size="large" style={styles.loading} />
      ) : (
        <View style={styles.contentContainer}>
          {/* Name and Area */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            style={styles.mealDetailsContainer}
          >
            <Text style={styles.mealName}>{meal?.strMeal}</Text>
            <Text style={styles.mealArea}>{meal?.strArea}</Text>
          </Animated.View>

          {/* Miscellaneous */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            style={styles.miscContainer}
          >
            {renderMiscItem("🕒", "35", "Mins")}
            {renderMiscItem("👥", "03", "Servings")}
            {renderMiscItem("🔥", "103", "Cal")}
            {renderMiscItem("🔒", "", "Easy")}
          </Animated.View>

          {/* Ingredients */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            style={styles.sectionContainer}
          >
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View key={i} style={styles.ingredientItem}>
                    <View style={styles.ingredientBullet} />
                    <View style={styles.ingredientTextContainer}>
                      <Text style={styles.ingredientMeasure}>
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text style={styles.ingredientName}>
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* Instructions */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            style={styles.sectionContainer}
          >
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructionsText}>{meal?.strInstructions}</Text>
          </Animated.View>

          {/* Recipe Video */}
          {meal.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(700)
                .springify()
                .damping(12)}
              style={styles.sectionContainer}
            >
              <Text style={styles.sectionTitle}>Recipe Video</Text>
              <YouTubeIframe
                videoId={getYoutubeVideoId(meal.strYoutube)}
                height={hp(30)}
              />
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const renderMiscItem = (icon, value, label) => (
  <View style={styles.miscItem}>
    <View style={styles.miscIconContainer}>
      <Text>{icon}</Text>
    </View>
    <View style={styles.miscTextContainer}>
      <Text style={styles.miscValue}>{value}</Text>
      <Text style={styles.miscLabel}>{label}</Text>
    </View>
  </View>
);

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
  favouriteButton: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    marginRight: wp(5),
  },
  loading: {
    marginTop: hp(20),
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  mealDetailsContainer: {
    marginBottom: hp(2),
  },
  mealName: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
  mealArea: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#9CA3AF", // text-neutral-500
  },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  miscItem: {
    flex: 1,
    backgroundColor: "#FBBF24", // bg-amber-300
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 75,
    alignItems: "center",
  },
  miscIconContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    height: hp(6.5),
    width: hp(6.5),
    justifyContent: "center",
    alignItems: "center",
  },
  miscTextContainer: {
    alignItems: "center",
    paddingVertical: hp(0.5),
  },
  miscValue: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
  miscLabel: {
    fontSize: hp(1.3),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
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
  ingredientMeasure: {
    fontSize: hp(1.7),
    fontWeight: "700",
    color: "#4B5563", // text-neutral-700
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
