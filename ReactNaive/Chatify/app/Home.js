import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { Pressable } from "react-native";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // For icons
import BASE_URL from "./server";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import ErrorAlert from "./Component";

export default function MessageScreen() {
  const [getChat, setChat] = useState([]);

  const[getFName,setFName]=useState("");
  const[getLName,setLName]=useState("");
  const[getCountry,setCountry]=useState("");
  const[getmobile,setmobile]=useState("");
  const[getJoinDate,setJonDate]=useState("");
  const[getId,setId]=useState("");
  // Sample data for chat list

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
    async function fetchData() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);
      setId(user.id);
      setFName(user.Fname);
      setLName(user.Lname);
      setmobile(user.mobile);
      setJonDate(user.joinDate);
      setCountry(user.country.name);
      console.log(user);

      let response = await fetch(
        BASE_URL + "/Chatify/UserHomeLoad?id=" + user.id 
      );
      if (response.ok) {
        let json = await response.json();

        if (json.success) {
          let chatArray = json.jsonChatArray;
 
          setChat(chatArray);
          console.log(chatArray);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <LinearGradient colors={["#E6E6FA", "#fff"]} style={styles.container}>
      <StatusBar backgroundColor={"#E6E6FA"} />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chatify</Text>
        <Icon name="log-out-outline" size={30} color="#f03e3e" onPress={()=>{
          setAlert("Are You Want to Log out!") ;
          
        }}  />
      </View>

      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          placeholderTextColor="#aaa"
        />
        <Icon name="search" size={20} color="#aaa" />
      </View> */}

     
      {!getChat||getChat.length == 0 ? 
      <View style={styles.lview2}>
         
          <TouchableOpacity >
            <LottieView
              autoPlay 
              style={{
                width: 320, 
                height: 619,
              }}
              colorFilters={[
                {
                  keypath: "Shape Layer 1",
                  color: "#A020F0",
                },
              ]}
              source={require("../assets/Animation/enlop (2).json")}
            />
          </TouchableOpacity>
          
        </View>:

      <FlatList
        data={getChat}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.push({
                pathname:"/chat",
                params:item
              });
            }}
          >
            <View style={styles.chatItem}>

              <View
              style={item.other_user_status == 1 ? styles.avatar_1: styles.avatar_2
              }
            >
              {item.avatar_image_Found ? 
                <Image
                  source={{ uri: BASE_URL+"/Chatify/Avartarimages/"+item.other_user_mobile+".png" }}
                  contentFit={"contain"}
                  style={styles.profileImage1}
                />
               : 
                <Text>{item.other_user_avatar_leters}</Text>
              }
            </View>

              <View style={styles.chatDetails}>
                <Text style={styles.chatName}>{item.other_user_name}</Text>    
                <Text style={styles.chatMessage} numberOfLines={1}>{item.message}</Text>
              </View>
              <View style={styles.chatMeta}>
              {item.unSeenMasaageCount!="0"?
                  <View style={styles.unreadDot} >
                    <Text style={styles.dotText}>{item.unSeenMasaageCount}</Text>
                  </View>
                  :null}
                <Text style={styles.chatTime}>{item.dateTime}</Text>
                <Text style={styles.chatTime}>{"("+item.other_user_country+")"}</Text>
               
                {/* <Text style={styles.chatTime}>{"("+item.unSeenMasaageCount+")"}</Text>  */}
               
                 
              
              </View>
            </View>
          </Pressable>
        )}
        estimatedItemSize={200}
      />
                }

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => {
            router.push("/Home");
          }}
        >
          <Icon name="home-outline" size={30} color="#bd78f0" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/AllUsers");
          }}
          style={styles.navButton}
        >
          <Icon name="chatbubble-outline" size={30} color="#aaa"  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/MyAccount?user_id="+getId+"&userMobile="+getmobile+"&userJoinDate="+getJoinDate+"&userFName="+getFName+"&getLName="+getLName+"&userCountry="+getCountry);
           }}
        >
          <Icon name="person-outline" size={30} color="#aaa"   />
        </TouchableOpacity>
      </View>
      <ErrorAlert showAlert={showAlert} alertMessage={alertMessage} hideAlert={hideAlert1} showConbutton={true} onConfirmPressed1={async()=>{
          try {
            // Specify the key of the item you want to remove
            const key = 'user'; // Change this to your specific key
            await AsyncStorage.removeItem(key);
            // Alert.alert('message',"User Log Out Successful");
           
            router.replace("/SignIn");
          } catch (error) {
            // Alert.alert('Error removing data:', );
            setAlert(error.message)
          }
        }}/>
     
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  lview2: {
 
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // backgroundColor: '#F5F6FA',
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  // searchContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "#fff",
  //   marginHorizontal: 20,
  //   marginBottom: 10,
  //   borderRadius: 10,
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 1.41,
  //   elevation: 5,
  // },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  avatar_1: {

    marginRight: 10,
    borderColor: "#49eb9f",
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    
  },
  avatar_2: {

    marginRight: 10,
    borderColor: "#aaa",
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  profileImage1:{
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  chatMessage: {
    color: "#999",
    marginTop: 5,
  },
  chatMeta: {
    alignItems: "flex-end",
  },
  chatTime: {
    color: "#999",
    fontSize: 10,
  },
  unreadDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#49eb9f",
   
    // marginTop: 5,
    justifyContent:"center",
    alignItems:"center"
  },
  dotText:{
    // margin:1,
    color:"white"
  },

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
  userText:{
    alignSelf:"center",

    // justifyContent:"center",
  }
});
