// import { View, Text, Image } from "react-native";
// import React, { useEffect } from "react";
// import { StatusBar } from "expo-status-bar";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
// import { useNavigation } from "@react-navigation/native";

// export default function WelcomeScreen() {
//   const ring1padding = useSharedValue(0);
//   const ring2padding = useSharedValue(0);

//   const navigation = useNavigation();

//   useEffect(() => {
//     ring1padding.value = 0;
//     ring2padding.value = 0;
//     setTimeout(
//       () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
//       100
//     );
//     setTimeout(
//       () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
//       300
//     );

//     setTimeout(() => navigation.navigate("Home"), 2500);
//   }, []);
//   return (
//     <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
//       <StatusBar style="light" />

//       {/* logo image with rings */}
//       <Animated.View
//         className="bg-white/20 rounded-full"
//         style={{ padding: ring2padding }}
//       >
//         <Animated.View
//           className="bg-white/20 rounded-full"
//           style={{ padding: ring1padding }}
//         >
//           <Image
//             source={require("../../assets/images/welcome.png")}
//             style={{ width: hp(20), height: hp(20) }}
//           />
//         </Animated.View>
//       </Animated.View>

//       {/* title and punchline */}
//       <View className="flex items-center space-y-2">
//         <Text
//           style={{ fontSize: hp(7) }}
//           className="font-bold text-white tracking-widest"
//         >
//           Foodie
//         </Text>
//         <Text
//           style={{ fontSize: hp(2) }}
//           className="font-medium text-white tracking-widest"
//         >
//           your food recipe app
//         </Text>
//       </View>
//     </View>
//   );
// }
import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );

    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View
        style={[styles.ring, { padding: ring2padding }]}
      >
        <Animated.View
          style={[styles.ring, { padding: ring1padding }]}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Foodie</Text>
        <Text style={styles.subtitle}>your food recipe app</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBBF24", // amber-500
  },
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // white/20
    borderRadius: 9999, // full rounded
  },
  logo: {
    width: hp(20),
    height: hp(20),
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(7),
    fontWeight: "bold",
    color: "#FFFFFF", // white
    letterSpacing: 3, // tracking-widest
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#FFFFFF", // white
    letterSpacing: 3, // tracking-widest
  },
});
