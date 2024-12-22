import * as SplashScreen from "expo-splash-screen";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "react-native";
import BASE_URL from "./server";


SplashScreen.preventAutoHideAsync();

export default function UserAccount() {

    const parameters =useLocalSearchParams();
  console.log(parameters.other_user_id);
  console.log(parameters.OtherUserMobile); 
  console.log(parameters.OtherUserdate);
  console.log(parameters.OtherUserName);
  console.log(parameters.imageStatus);
  const image =true;

  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/Fonts/Poppins-Regular.ttf"),
    "Oxygen-Bold": require("../assets/Fonts/Oxygen-Bold.ttf"),
    "Oxygen-Regular": require("../assets/Fonts/Oxygen-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  
  const logoPath2 = require("../assets/Images/defaultImage01.png");
  // const defaultImage = require("../assets/Images/MySplash.png");

  return (
    <LinearGradient colors={["#E6E6FA", "#fff"]} style={styleSheet.Lview1}>
       <StatusBar backgroundColor={"#E6E6FA"} />
     
      
        <View style={styleSheet.header}>
          <View>
          <TouchableOpacity onPress={()=>{router.push("/Home");}}>
            <Icon name="arrow-back" size={24} color="#555" />
            </TouchableOpacity>
          </View>
          <View style={styleSheet.profileInfo}>
            <Image
              source={require("../assets/Images/ChatIcon.png")}
              style={styleSheet.avatar}
            />
            <View style={styleSheet.userDetails}>
              <Text style={styleSheet.accountText}>User Account</Text>
            </View>
          </View>
        </View>

        <View>
          <View>
        
           
          
          </View>
          {parameters.imageStatus=="true"?
          <Image
          source={{ uri: BASE_URL+"/Chatify/Avartarimages/"+parameters.OtherUserMobile+".png" }}
          style={styleSheet.Image1}
          contentFit={"cover"}
        />:
        <Image
         
            source={logoPath2} 
            style={styleSheet.Image1}
            contentFit={"cover"}
          />
       
          }
          
          
        </View>
        
        <View style={styleSheet.view3}>
          <View style={styleSheet.view4}>
            <Text style={styleSheet.Text4}>{parameters.OtherUserName}</Text>
          </View>
          
          <View style={styleSheet.view5}>
            <Text style={styleSheet.Text3}> Mobile ⇒{parameters.OtherUserMobile}</Text>
            <Text style={styleSheet.Text3}>
              Country ⇒  {parameters.OtherCountry}
            </Text>
            <Text style={styleSheet.Text3}>
              Join Date ⇒  {parameters.OtherUserdate}
            </Text>
           
            

          </View>
      
        </View>
       
      
    </LinearGradient>
  );
}
const styleSheet = StyleSheet.create({
  Lview1: { flex: 1 },
  accountText:{
    fontSize:20,
    color:"#662d91"

  },
  header: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    columnGap: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    height: 80,
    elevation: 5,
    zIndex: 1,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userDetails: {
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    // borderRadius: 25,
    // borderWidth:1,
    borderColor:"#aaa"
  },
  
  container2: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  button1: {
    backgroundColor: "#662d91",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  text5: {
    fontFamily: "Oxygen-Regular",
    color: "white",
  },
  view1: {
    marginTop: 30,
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 10,
    marginBottom: 30,
  },
  view2: {
    alignSelf: "flex-start",
    backgroundColor: "red",
  },
  view5: {
    alignSelf: "center",
  },
  input1: {
    height: 40,
    fontSize: 25,
    borderWidth: 1,
    borderRadius: 10,
  },
  icon2: {
    alignSelf: "center",
  },
  icon1: {
    marginHorizontal: 10,
    marginBottom: -25,
    alignSelf: "flex-end",

    zIndex: 1,
  },

  view3: {
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
    height: 400,
    borderRadius: 40,
    marginTop: -25,
    // borderColor: "#E5D2F9",
    elevation: 5,

    // borderWidth: 5,
  },

  Image: {
    alignSelf: "center",
    width: 40,
    height: 40,
  },
  Image1: {
    width: "100%",
    height: 400,
    marginTop: -20,
  },
  Text1: {
    fontSize: 35,
    // fontFamily: "Oxygen-Bold",
    fontWeight: "bold",
    color: "#662d91",
  },
  Text2: {
    fontSize: 30,
    fontFamily: "Poppins-Bold",
  },
  Text3: {
    // color: "green",
    fontSize: 14,
  },
  view4: {
    flexDirection: "row",
    columnGap: 30,
    marginTop: 40,
    marginLeft: 20,
  },
  Text4: {
    fontSize: 30,
    fontWeight: "bold",
  },
  view5: {
    // flexDirection: "row",
    // columnGap: 30,
    marginTop: 20,
    marginLeft: 20,
    rowGap: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F5F6FA',
    borderRadius: 20,
  },
});

