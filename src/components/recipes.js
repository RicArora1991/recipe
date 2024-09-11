// import { View, Text, Pressable, Image } from "react-native";
// import React from "react";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import MasonryList from "@react-native-seoul/masonry-list";
// import { mealData } from "../constants";
// import Animated, { FadeInDown } from "react-native-reanimated";
// import Loading from "./loading";
// import { CachedImage } from "../helpers/image";
// import { useNavigation } from "@react-navigation/native";

// export default function Recipes({ categories, meals }) {
//   const navigation = useNavigation();
//   return (
//     <View className="mx-4 space-y-3">
//       <Text
//         style={{ fontSize: hp(3) }}
//         className="font-semibold text-neutral-600"
//       >
//         Recipes
//       </Text>
//       <View>
//         {categories.length == 0 || meals.length == 0 ? (
//           <Loading size="large" className="mt-20" />
//         ) : (
//           <MasonryList
//             data={meals}
//             keyExtractor={(item) => item.idMeal}
//             numColumns={2}
//             showsVerticalScrollIndicator={false}
//             renderItem={({ item, i }) => (
//               <RecipeCard item={item} index={i} navigation={navigation} />
//             )}
//             // refreshing={isLoadingNext}
//             // onRefresh={() => refetch({first: ITEM_CNT})}
//             onEndReachedThreshold={0.1}
//             // onEndReached={() => loadNext(ITEM_CNT)}
//           />
//         )}
//       </View>
//     </View>
//   );
// }

// const RecipeCard = ({ item, index, navigation }) => {
//   let isEven = index % 2 == 0;
//   return (
//     <Animated.View
//       entering={FadeInDown.delay(index * 100)
//         .duration(600)
//         .springify()
//         .damping(12)}
//     >
//       <Pressable
//         style={{
//           width: "100%",
//           paddingLeft: isEven ? 0 : 8,
//           paddingRight: isEven ? 8 : 0,
//         }}
//         className="flex justify-center mb-4 space-y-1"
//         onPress={() => navigation.navigate("RecipeDetail", { ...item })}
//       >
//         <Image
//           source={{ uri: item.strMealThumb }}
//           style={{
//             width: "100%",
//             height: index % 3 == 0 ? hp(25) : hp(35),
//             borderRadius: 35,
//           }}
//           className="bg-black/5"
//         />
//         {/* <CachedImage
//                      uri= {item.strMealThumb}
//                      style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius: 35}}
//                      className="bg-black/5"
//                      sharedTransitionTag={item.strMeal}
//                 /> */}
//         <Text
//           style={{ fontSize: hp(1.5) }}
//           className="font-semibold ml-2 text-neutral-600"
//         >
//           {item.strMeal.length > 20
//             ? item.strMeal.slice(0, 20) + "..."
//             : item.strMeal}
//         </Text>
//       </Pressable>
//     </Animated.View>
//   );
// };
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./loading";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ categories, meals }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <View>
        {categories.length === 0 || meals.length === 0 ? (
          <Loading size="large" style={styles.loading} />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={[
          styles.cardContainer,
          { paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 },
        ]}
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={[
            styles.recipeImage,
            { height: index % 3 === 0 ? hp(25) : hp(35) },
          ]}
        />
        <Text style={styles.recipeText}>
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4), // mx-4 equivalent
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginBottom: hp(1.5),
  },
  loading: {
    marginTop: hp(20),
  },
  cardContainer: {
    justifyContent: "center",
    marginBottom: hp(1.5),
  },
  recipeImage: {
    width: "100%",
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.05)", // bg-black/5
  },
  recipeText: {
    fontSize: hp(1.5),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
});
