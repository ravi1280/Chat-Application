import * as SplashScreen from "expo-splash-screen";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { router } from "expo-router";
import { ScrollView } from "react-native";
import BASE_URL from "./server";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function StartScreen() {

  // const [loading, setLoading] = useState(false);
  // const showLoading = () => {
  //   setLoading(true);
  // };
  // const hideLoading = () => {
  //   setLoading(false);
  // };

  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/Fonts/Poppins-Regular.ttf"),
    "Oxygen-Bold": require("../assets/Fonts/Oxygen-Bold.ttf"),
    "Oxygen-Regular": require("../assets/Fonts/Oxygen-Regular.ttf"),
  });

  useEffect(
    ()=>{
      async function checkUserInAsyncStorage() {

        try {
          let userJson = await AsyncStorage.getItem("user");
          if (userJson != null) {
            console.log("1");
            console.log(userJson);
            router.replace("./Home"); 
          }
        } catch (error) {
          console.log(error);
        }
      }
      checkUserInAsyncStorage();
    },[]
  );

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  
  const logoPath = require("../assets/Images/HomeMain.png");

  return (
   
    <LinearGradient colors={["#662d91", "#E6E6FA"]} style={styleSheet.Lview1}>
      <StatusBar backgroundColor={'#662d91'} />
      <SafeAreaView>
        <ScrollView>
        <View style={styleSheet.view1}>
          <Text style={styleSheet.Text1}>CHATIFY</Text>
        </View>
        <View>
          <Image
            source={logoPath}
            style={styleSheet.Image}
            contentFit={"contain"}
            
          />
        </View>
        <View style={styleSheet.view2}>
          <View style={styleSheet.view3}></View>
          <TouchableOpacity onPress={()=>{router.replace("/SignIn");}}>
            <LottieView
              autoPlay 
              style={{
                width: 320, 
                height: 100,
              }}
              colorFilters={[
                {
                  keypath: "Shape Layer 1",
                  color: "#A020F0",
                },
              ]}
              source={require("../assets/Animation/Start3L.json")}
            />
          </TouchableOpacity>
          <View style={styleSheet.view4}>
            <Text>Copyright ©Chatify 2024 || All rights reserved.</Text>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styleSheet = StyleSheet.create({
  Lview1: {
    flex: 1,
  },
  view1: {
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  padding1: {
    paddingTop: StatusBar.currentHeight,
  },
  view2: {
    width: "100%",
    height: 300,
    borderRadius: 60,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
  },
  Image: {
    alignSelf: "center",
    width: "100%",
    height: 490,
    padding: 5,
    // marginBottom: 30,
  },
  Text1: {
    fontSize: 35,
    fontFamily: "Oxygen-Bold",
    color: "white",
  },
  view3: {
    marginTop: 25,
    padding: 10,
  },
  view4: {
    marginTop: 20,
  },
  Text2: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    // color: "white",
  },
});
