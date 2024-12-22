import * as SplashScreen from "expo-splash-screen";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextInputComponent,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import BASE_URL from "./server";
import { Picker as RNPicker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons"; // For icons
import ErrorAlert, { Component } from "./Component";

SplashScreen.preventAutoHideAsync();

export default function SignUp() {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("none"); // Holds selected country
  //password Validation
  const [getpassword, setPassword] = useState("");
  const [isValidLength, setIsValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUpperLowerCase, setHasUpperLowerCase] = useState(false);

  const validatePassword = (input) => {
    setIsValidLength(input.length >= 8);
    setHasNumber(/\d/.test(input));
    setHasUpperLowerCase(/^(?=.*[a-z])(?=.*[A-Z])/.test(input));
    setPassword(input);
  };

  //user Data
  const [getFname, setFname] = useState("");
  const [getLname, setLname] = useState("");
  const [getMobile, setMobile] = useState("");

  //load font
  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/Fonts/Poppins-Regular.ttf"),
    "Oxygen-Bold": require("../assets/Fonts/Oxygen-Bold.ttf"),
    "Oxygen-Regular": require("../assets/Fonts/Oxygen-Regular.ttf"),
  });

  //Alert

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert1 = () => {
    setShowAlert(true);
  };

  const hideAlert1 = () => {
    setShowAlert(false);
  };

  function setAlert(message) {
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
  //load Image URL
  const logoPath = require("../assets/Images/ChatIcon.png");

  return (
    <LinearGradient colors={["#E6E6FA", "#fff"]} style={styleSheet.Lview1}>
      <StatusBar backgroundColor={"#E6E6FA"} />
      <SafeAreaView>
        <ScrollView>
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
            <Text style={styleSheet.Text3}>Sign Up</Text>
          </View>

          <View style={styleSheet.pickerContainer}>
            <RNPicker
              selectedValue={selectedCountry}
              style={styleSheet.picker}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            >
              <RNPicker.Item label="Select a country..." value="none" />
              <RNPicker.Item label="United States" value="United States" />
              <RNPicker.Item label="Canada" value="Canada" />
              <RNPicker.Item label="United Kingdom" value="United Kingdom" />
              <RNPicker.Item label="Sri Lanka" value="Sri Lanka" />
              <RNPicker.Item label="Australia" value="Australia" />
              <RNPicker.Item label="India" value="India" />
              <RNPicker.Item label="Japan" value="Japan" />
            </RNPicker>
          </View>
          <View style={styleSheet.inputContainer}>
            <Icon name="call" size={20} color="#aaa" />
            <TextInput
              onChangeText={(text) => {
                setMobile(text);
              }}
              placeholder="Enter your Mobile"
              style={styleSheet.inputStyle}
              keyboardType={"phone-pad"}
            />
          </View>

          <View style={styleSheet.inputContainer}>
            <Icon name="person" size={20} color="#aaa" />
            <TextInput
              onChangeText={(text) => {
                setFname(text);
              }}
              placeholder="Enter your First Name"
              style={styleSheet.inputStyle}
            />
          </View>
          <View style={styleSheet.inputContainer}>
            <Icon name="person" size={20} color="#aaa" />
            <TextInput
              onChangeText={(text) => {
                setLname(text);
              }}
              placeholder="Enter your Last Name"
              style={styleSheet.inputStyle}
            />
          </View>

          <View style={styleSheet.inputContainer}>
            <Icon name="lock-closed" size={20} color="#aaa" />
            <TextInput
              placeholder="Enter your Passwod"
              style={styleSheet.inputStyle}
              secureTextEntry
              value={getpassword}
              onChangeText={validatePassword}
              onFocus={() => setIsFocused(true)} // Show content when focused
              onBlur={() => setIsFocused(false)} // Hide content when focus is lost
            />
          </View>
          {isFocused ? 
            <View>
              <View style={styleSheet.detail}>
                <FontAwesome6
                  name="circle-check"
                  size={14}
                  color="#333"
                  style={[
                    styleSheet.iconStyle,
                    isValidLength ? styleSheet.valid : styleSheet.invalid,
                  ]}
                />
                <Text
                  style={[
                    styleSheet.text4,
                    isValidLength ? styleSheet.valid : styleSheet.invalid,
                  ]}
                >
                  At Least 8 Characters
                </Text>
              </View>
              <View style={styleSheet.detail}>
                <FontAwesome6
                  name="circle-check"
                  size={14}
                  color="#333"
                  style={[
                    styleSheet.iconStyle,
                    hasNumber ? styleSheet.valid : styleSheet.invalid,
                  ]}
                />
                <Text
                  style={[
                    styleSheet.text4,
                    hasNumber ? styleSheet.valid : styleSheet.invalid,
                  ]}
                >
                  At Least 1 Number
                </Text>
              </View>
              <View style={styleSheet.detail}>
                <FontAwesome6
                  name="circle-check"
                  size={14}
                  color="#333"
                  style={[
                    styleSheet.iconStyle,
                    hasUpperLowerCase ? styleSheet.valid : styleSheet.invalid,
                  ]}
                />
                <Text
                  style={[
                    styleSheet.text4,
                    hasUpperLowerCase ? styleSheet.valid : styleSheet.invalid,
                  ]}
                >
                  Both Upper and LowerCase letters
                </Text>
              </View>
            </View>
           : null}

          <View style={styleSheet.container2}>
            <Pressable
              onPress={async () => {
                let formData = new FormData();
                formData.append("mobile", getMobile);
                formData.append("fname", getFname);
                formData.append("lname", getLname);
                formData.append("password", getpassword);
                formData.append("country", selectedCountry);

                console.log(getFname);
                console.log(getLname);
                console.log(getMobile);
                console.log(getpassword);
                console.log(selectedCountry);

                let response = await fetch(BASE_URL + "/Chatify/UserSignUp", {
                  method: "POST",
                  body: formData,
                });
                if (response.ok) {
                  let json = await response.json();
                  if (json.success) {
                    //user Registration Success
                    setAlert(json.message);
                    router.replace("/SignIngg");
                  } else {
                    // User Registaion Falid

                    setAlert(json.message);
                  }
                }
              }}
              style={styleSheet.button1}
            >
              <Text style={styleSheet.text5}>Sign Up</Text>
            </Pressable>
            <View style={styleSheet.view4}>
              <Text
                onPress={() => {
                  router.push("/SignIn");
                }}
              >
                Alredy Registerd ?. Go To Sign In
              </Text>
            </View>
          </View>
          <ErrorAlert
            showAlert={showAlert}
            alertMessage={alertMessage}
            hideAlert={hideAlert1}
          />
        </ScrollView>
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
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
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
  picker: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerContainer: {
    padding: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
    borderRadius: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  detail: {
    flexDirection: "row",
    marginLeft: 10,
  },

  view1: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 10,
    marginBottom: 30,
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
    // backgroundColor: "red",
    // marginVertical: 10,
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
    marginVertical: 20,
    marginHorizontal: 20,
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
  view4: {
    marginVertical: 10,
  },
});
