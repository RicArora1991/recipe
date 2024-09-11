// import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
// import React from "react";
// import { categoryData } from "../constants";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import Animated, { FadeInDown } from "react-native-reanimated";
// import { CachedImage } from "../helpers/image";

// export default function Categories({
//   categories,
//   activeCategory,
//   handleChangeCategory,
// }) {
//   return (
//     <Animated.View entering={FadeInDown.duration(500).springify()}>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         className="space-x-4"
//         contentContainerStyle={{ paddingHorizontal: 15 }}
//       >
//         {categories.map((cat, index) => {
//           let isActive = cat.strCategory == activeCategory;
//           let activeButtonClass = isActive ? " bg-amber-400" : " bg-black/10";
//           return (
//             <TouchableOpacity
//               key={index}
//               onPress={() => handleChangeCategory(cat.strCategory)}
//               className="flex items-center space-y-1"
//             >
//               <View className={"rounded-full p-[6px] " + activeButtonClass}>
//                 <Image
//                   source={{ uri: cat.strCategoryThumb }}
//                   style={{ width: hp(6), height: hp(6) }}
//                   className="rounded-full"
//                 />
//               </View>
//               <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
//                 {cat.strCategory}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>
//     </Animated.View>
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
import React from "react";
import { useNavigation } from "@react-navigation/native"; // Import navigation
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  const navigation = useNavigation(); // Use navigation

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Add "My Food" category */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MyFood")} // Navigate to "MyFood" screen
          style={styles.categoryContainer}
        >
          {/* <View style={[styles.imageContainer, styles.myFoodButton]}>
            <Image
              source={require("../../assets/images/welcome.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.myFoodText}>My Food</Text>
          </View> */}
          <View style={[styles.imageContainer, styles.myFoodButton]}>
            <Image
              source={require("../../assets/images/welcome.png")}
              style={styles.categoryImage}
            />
          </View>
          <Text style={styles.categoryText}>My Food</Text>
        </TouchableOpacity>

        {categories.map((cat, index) => {
          let isActive = cat.strCategory == activeCategory;
          let activeButtonStyle = isActive
            ? styles.activeButton
            : styles.inactiveButton;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={styles.categoryContainer}
            >
              <View style={[styles.imageContainer, activeButtonStyle]}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={styles.categoryImage}
                />
              </View>
              <Text style={styles.categoryText}>{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 15,
  },
  categoryContainer: {
    alignItems: "center",
    marginRight: wp(4),
  },
  imageContainer: {
    borderRadius: 9999,
    padding: 6,
  },
  activeButton: {
    backgroundColor: "#F59E0B",
  },
  inactiveButton: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  categoryImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: 9999,
  },
  categoryText: {
    fontSize: hp(1.6),
    color: "#52525B",
    marginTop: hp(0.5),
  },
  // Styles for "My Food" category
  myFoodButton: {
    backgroundColor: "#4ADE80",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  myFoodText: {
    color: "white",
    fontWeight: "bold",
    fontSize: hp(1.5),
  },
});
