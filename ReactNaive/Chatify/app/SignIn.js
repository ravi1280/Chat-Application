import * as SplashScreen from "expo-splash-screen";
import {  Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import BASE_URL from "./server";
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import ErrorAlert from "./Component";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function SignIn() {
  const [getName,setName]= useState("😎");
  const [getMobile, setMobile] = useState("");
  const [getpassword, setPassword] = useState("");

  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/Fonts/Poppins-Regular.ttf"),
    "Oxygen-Bold": require("../assets/Fonts/Oxygen-Bold.ttf"),
    "Oxygen-Regular": require("../assets/Fonts/Oxygen-Regular.ttf"),
  });
  const logoPath = require("../assets/Images/ChatIcon.png");
  //Alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert1 = () => {
      setShowAlert(true) ;
  };

  const hideAlert1 = () => {
    setShowAlert(false);
  };

  function setAlert(message){  
    setAlertMessage(message);
    showAlert1();

  }

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  useEffect(
    ()=>{
      async function checkUserInAsyncStorage() {

        try {
          let userJson = await AsyncStorage.getItem("user");
          if (userJson != null) {
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


  return (
    <LinearGradient colors={["#E6E6FA", "#fff"]} style={styleSheet.Lview1}>
      <StatusBar backgroundColor={"#E6E6FA"} />
      <SafeAreaView>
        <View style={styleSheet.view1}>
          <View>
            <Image
              source={logoPath}
              style={styleSheet.Image}
              contentFit={"contain"}
            />
          </View>
          <Text style={styleSheet.Text1}>CHATIFY</Text>
        </View>

        <View style={styleSheet.view3}>
          <Text style={styleSheet.Text3}>Sign In</Text>
        </View>
        <View style={styleSheet.NameTag}>
              <Text style={styleSheet.NameText}>{getName}</Text>
            </View>
        <View style={styleSheet.view2}>
          <Text style={styleSheet.Text2}>
            Log in to your account and start chatting now!
          </Text>
        </View>

        <View style={styleSheet.inputContainer}>
        <Icon name="call" size={20} color="#aaa" />
        
          <TextInput
            onChangeText={(text) => {
              setMobile(text);
              // console.log(getMobile);
            }}
            placeholder="Enter your Mobile"
            style={styleSheet.inputStyle}
            keyboardType={"phone-pad"}
            onEndEditing={async () => {
              if (getMobile.length == 10) {
                // console.log(getMobile);
                let response = await fetch(BASE_URL+"/Chatify/CheckLetters?mobile=" +getMobile
                );
                if (response.ok) {
                  let json = await response.json();
                  // setAlert(json.letters);
                  setName(json.letters);
                }
              }
            }}
          />
        </View>
        <View style={styleSheet.inputContainer}>
        <Icon name="lock-closed" size={20} color="#aaa" />
          <TextInput
          
            placeholder="Enter your Passwod"
            style={styleSheet.inputStyle}
            secureTextEntry 
            onChangeText={(text)=>{
              setPassword(text);
              // console.log(getpassword);
            }}
          />
        </View>

        <View style={styleSheet.container2}> 
          <Pressable
            style={styleSheet.button1}
            onPress={async() => {
            
              let response = await fetch(BASE_URL+"/Chatify/UserSignIn",
              {
                method:"POST",
                body:JSON.stringify({
                  mobile: getMobile,
                  password: getpassword,
                }),
                headers: { "Content-Type": "application/json" },
            }
            );
           

            if (response.ok) {
              //convert to js object
              let json = await response.json();
              if (json.success) {
                //user Registration Success
                let user = json.user;
                // Alert.alert("Success","Hello  "+ user.Fname + "! " + json.message);
                

                try {
                  console.log(user);
                  await AsyncStorage.setItem("user", JSON.stringify(user));
                  router.replace("./Home");
                } catch (error) {
                  setAlert("Unable to Prcess your Request ");
                }
              } else {
                // User Registaion Falid
                setAlert(json.message);
              }
            }
            }}
          >
            <Text style={styleSheet.text5}>Sign In</Text>
          </Pressable>
          <View style={styleSheet.view4} >
            <Text onPress={()=>{router.push("/SignUp");}}>New User ?. Go To Sign Up</Text>
          </View>
        </View>
        <ErrorAlert showAlert={showAlert} alertMessage={alertMessage} hideAlert={hideAlert1}/>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styleSheet = StyleSheet.create({
  Lview1: { flex: 1 },
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
    
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  iconStyle: {
    marginRight: 10,
  },
  detail: {
    flexDirection: "row",
    marginLeft: 10,
  },

  view1: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 10,
  },

  Image: {
    alignSelf: "center",
    width: 40,
    height: 40,
  },
  Text1: {
    fontSize: 35,
    fontFamily: "Oxygen-Bold",
    color: "#662d91",
  },

  view2: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  Text2: {
    fontFamily: "Oxygen-Regular",
    fontSize: 16,
  },
  text4: {
    fontFamily: "Oxygen-Regular",
  },
  text5: {
    fontFamily: "Oxygen-Regular",
    color: "white",
  },
  view3: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
  view4: {
    marginVertical: 10,
    
  },
  Text3: {
    fontFamily: "Oxygen-Bold",
    fontSize: 25,
  },
  valid: {
    color: "green",
  },
  invalid: {
    color: "#cacaca",
  },

  NameTag:{
    marginBottom:20,
    width:100,
    height:100,
    borderRadius:50,
    backgroundColor:"#E6E6FA",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
  },
  NameText:{
    fontSize:25,
    color:"#662d91",
    fontWeight:"bold"
  }
});
