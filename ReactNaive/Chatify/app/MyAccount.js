import * as SplashScreen from "expo-splash-screen";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import { StatusBar } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import BASE_URL from "./server";
import ErrorAlert from "./Component";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function myAccount() {
  const parameters = useLocalSearchParams();

  const [getfname, setfname] = useState(parameters.userFName);
  const [getlname, setlname] = useState(parameters.getLName);
  const [getImage, setImage] = useState();

  const mobile = parameters.userMobile;

  const [imageExists, setImageExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [getmodalVisible, setModalVisible] = useState(false);
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

  const imageUrl = BASE_URL + "/Chatify/Avartarimages/" + mobile + ".png?timestamp="+new Date().getTime();
  const defaultImage = require("../assets/Images/defaultImage01.png");

  // if (isLoading) {
  //   return (
  //     <View>
  //       <Text>Loading</Text>
  //     </View>
  //   );
  // }

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  useEffect(() => {
    const checkImageExists = async () => {
      try {
        const response = await fetch(imageUrl, {
          method: "HEAD",
        });
        if (response.ok) {
          setImageExists(true);
          setImage(imageUrl);
          console.log(imageUrl); // Image found
        } else {
          setImageExists(false);
          setImage(defaultImage);
          console.log("imge2"); // Image not found
        }
      } catch (error) {
        setImageExists(false); // Error fetching the image, assume not found
      } finally {
        setIsLoading(false); // Loading complete
      }
    };

    checkImageExists();
  }, []);
  useEffect(() => {
    // Ensure state updates only once when parameters are available
    if (parameters.userFName && parameters.userLName) {
      setfname(parameters.userFName);
      setlname(parameters.userLName);
    }
  }, [parameters]);

  const logoPath1 = require("../assets/Images/ChatIcon.png");

  const updateUserData = async (newFname, newLname) => {
    try {
    
      const jsonValue = await AsyncStorage.getItem("user");

      if (jsonValue !== null) {
        
        const userData = JSON.parse(jsonValue);

       
        userData.Fname = newFname;
        userData.Lname = newLname;

        
        await AsyncStorage.setItem("user", JSON.stringify(userData));

        console.log("User data updated successfully!");
      } else {
        console.log("No user data found in AsyncStorage!");
      }
    } catch (error) {
      console.log("Error updating user data:", error);
    }
  };

  return (
    <LinearGradient colors={["#E6E6FA", "#fff"]} style={styleSheet.Lview1}>
      <StatusBar backgroundColor={"#E6E6FA"} />

      <View style={styleSheet.header}>
        <View>
          <TouchableOpacity
            onPress={() => {
              router.push("/Home");
            }}
          >
            <Icon name="arrow-back" size={24} color="#555" />
          </TouchableOpacity>
        </View>
        <View style={styleSheet.profileInfo}>
          <Image source={logoPath1} style={styleSheet.avatar} />
          <View style={styleSheet.userDetails}>
            <Text style={styleSheet.accountText}>My Account</Text>
          </View>
        </View>
      </View>

      <View>
        <View>
          <Icon
            onPress={async () => {
              let result = await ImagePicker.launchImageLibraryAsync({});

              if (!result.canceled) {
                setImage(result.assets[0].uri);
              }
            }}
            name="add-circle"
            size={24}
            color="#555"
            style={styleSheet.icon1}
          />
        </View>
        {/* {setImage(BASE_URL+"/Chatify/Avartarimages/"+mobile+".png")} */}
        {/* {getImage==null?<Image
            source={defaultImage}
            style={styleSheet.Image1}
            contentFit={"cover"}
          />:<Image
          source={getImage}
          style={styleSheet.Image1}
          contentFit={"cover"}
        />} */}

        <Image
          source={getImage}
          style={styleSheet.Image1}
          contentFit={"cover"}
        />
      </View>

      <View style={styleSheet.view3}>
        <View style={styleSheet.view4}>
          <Text style={styleSheet.Text4}>
            {getfname} {getlname}
          </Text>
          <TouchableOpacity>
            <Icon
              name="add-circle"
              size={24}
              color="#555"
              style={styleSheet.icon2}
              onPress={() => setModalVisible(true)}
            />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={getmodalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styleSheet.inputContainerView}>
            <View style={styleSheet.inputContainer1}>
              <Text style={styleSheet.ModelText}>Enter Your Editable Name</Text>
              <View style={styleSheet.inputContainer2}>
                <TextInput
                  placeholder="First name ..."
                  style={styleSheet.input}
                  placeholderTextColor="#aaa"
                  onChangeText={(text) => {
                    setfname(text);
                  }}
                />
                <TextInput
                  placeholder="Last name ..."
                  style={styleSheet.input}
                  placeholderTextColor="#aaa"
                  onChangeText={(text) => {
                    setlname(text);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View style={styleSheet.view5}>
          <Text style={styleSheet.Text3}>Mobile ⇒ {parameters.userMobile}</Text>
          <Text style={styleSheet.Text3}>
            Country ⇒ {parameters.userCountry}
          </Text>
          <Text style={styleSheet.Text3}>
            Join Date ⇒ {parameters.userJoinDate}
          </Text>
        </View>

        <View style={styleSheet.container2}>
          <Pressable
            style={styleSheet.button1}
            onPress={async () => {
              // alert(getImage);
              let form = new FormData();
              form.append("fname", getfname);
              form.append("lname", getlname);
              form.append("mobile", mobile); 

              if (getImage != null && getImage != defaultImage) {
                // alert(getImage);
                form.append("avatarImage", {
                  uri: getImage,
                  name: "avatar.png",
                  type: "image/png",
                });
              }

              let response = await fetch(BASE_URL + "/Chatify/UpdateProfile", {
                method: "POST",
                body: form,
              });
              if (response.ok) {
                let json = await response.json();
                if (json.success) {
                  // alert(json.message);
                  updateUserData(getfname, getlname);
                  setAlert(json.message);
                }
              }
            }}
          >
            <Text style={styleSheet.text5}>Update Profile</Text>
          </Pressable>
        </View>
        <View style={styleSheet.bottomNav}>
          <TouchableOpacity
            onPress={() => {
              router.push("/Home");
            }}
          >
            <Icon name="home-outline" size={30} color="#aaa" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/AllUsers");
            }}
            style={styleSheet.navButton}
          >
            <Icon name="chatbubble-outline" size={30} color="#aaa" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="person-outline" size={30} color="#bd78f0" />
          </TouchableOpacity>
        </View>
      </View>
      <ErrorAlert
        showAlert={showAlert}
        alertMessage={alertMessage}
        hideAlert={hideAlert1}
        // showConbutton={true}
      />
    </LinearGradient>
  );
}
const styleSheet = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "#E6E6FA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 10,
  },
  navButton: {
    backgroundColor: "#F5F6FA",
    padding: 10,
    borderRadius: 40,
    bottom: 10,
    alignSelf: "center",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    marginTop: -30,
    elevation: 10,
  },
  Lview1: { flex: 1 },
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
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
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
    // borderRadius: 20,
  },
  accountText: {
    fontSize: 20,
    color: "#662d91",
  },

  container2: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
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
  inputContainerView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  inputContainer1: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderTopWidth: 1,
    // borderTopColor: "#e5e5e5",

    rowGap: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F5F6FA",
    borderRadius: 10,
    marginBottom: 30,
  },
  ModelText: {
    fontSize: 18,
    marginTop: 20,
  },
});
