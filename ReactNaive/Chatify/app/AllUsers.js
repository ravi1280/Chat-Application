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
import { Picker as RNPicker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function allusers() {

   const[getSelectedCountry,setSelectedCountry] =useState("none");

  const [getUser, setUser] = useState([]);
  const[getId,setId]=useState("");


  const[getFName,setFName]=useState("");
  const[getLName,setLName]=useState("");
  const[getCountry,setCountry]=useState("");
  const[getmobile,setmobile]=useState("");
  const[getJoinDate,setJonDate]=useState("");

  // const handleSomeEvent = () => {
  //   fetchData();  // You can call fetchData anywhere now
  // };
  
  // Sample data for chat list
  const fetchData = async () => {
    let userJson = await AsyncStorage.getItem("user");
    let user = JSON.parse(userJson);
    setId(user.id);
    console.log("asyncStorage " + user.id);
    setFName(user.Fname);
    setLName(user.Lname);
    setmobile(user.mobile);
    setJonDate(user.joinDate);
    setCountry(user.country.name);
    console.log(user);

    let response = await fetch(BASE_URL + "/Chatify/AllUsers?id=" + user.id);
    if (response.ok) {
      let json = await response.json();
      if (json.success) {
        let userArray = json.jsonUserArray;
        setUser(userArray);
      }
    }
  };

  // Step 2: Use useEffect to call fetchData
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <LinearGradient colors={["#E6E6FA", "#fff"]} style={styles.container}>
      <StatusBar backgroundColor={"#E6E6FA"} />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chatify</Text>
        {/* <Icon name="ellipsis-vertical" size={24} color="#555" /> */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
      <Icon name="search" size={20} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Mobile Number..."
          placeholderTextColor="#aaa"
          onChangeText={async(text)=>{
            // console.log(text);
            // setUserText(text);
            let Response = await fetch(BASE_URL+"/Chatify/SearchUser?userMobile="+text+"&myid="+getId);
            if(Response.ok){
              let json = await Response.json();
             if(json.success){
              let UserArray = json.jsonUserArray;
              setUser(UserArray);

             }
            }

          }}
        />
       
      </View>
    {/* country selector */}
      <View style={styles.pickerContainer}>
            <RNPicker
              selectedValue={getSelectedCountry}
              style={styles.picker}
              onValueChange={async(itemValue) =>{
                // setSelectedCountry(itemValue);
                // Alert.alert('Selected Country', `You selected: ${itemValue}`);
                if(itemValue=="none"){
                  // alert("none");
                  fetchData();

                }else{

                let response = await fetch(BASE_URL+"/Chatify/CountryUsers?country="+itemValue+"&myid="+getId);
                if(response.ok){
                  let json = await response.json();
                  if(json.success){
                   let UserArray2 = json.jsonUserArray2;
                   setUser(UserArray2);
                  }
                }
              }

              } 
            }
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

     
      {/* {getChat==null?<View></View>:} */}

      <FlatList
        data={getUser}
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
                  source={{uri:BASE_URL+"/Chatify/Avartarimages/"+item.other_user_mobile+".png"}}
                  contentFit={"contain"}
                  style={styles.profileImage1}
                />
               : 
                <Text>{item.other_user_avatar_leters}</Text>
              }
            </View>

              <View style={styles.chatDetails}>
                <Text style={styles.chatName}>{item.other_user_name}</Text>
                {/* <Text style={styles.chatName}>{item.other_user_mobile}</Text>      */}
                <Text style={styles.chatMessage} numberOfLines={1}>Let’s Chat Now! 👋</Text>
              </View>
              <View style={styles.chatMeta}>
                <Text style={styles.chatTime}>{"("+item.other_user_country+")"}</Text>
             

              </View>
            </View>
          </Pressable>
        )}
        estimatedItemSize={200}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
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
          style={styles.navButton}
        >
          <Icon name="chatbubble-outline" size={30} color="#bd78f0" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/MyAccount?user_id="+getId+"&userMobile="+getmobile+"&userJoinDate="+getJoinDate+"&userFName="+getFName+"&getLName="+getLName+"&userCountry="+getCountry);
           }}
        >
          <Icon name="person-outline" size={30} color="#aaa"   />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
  },
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    shadowRadius: 1.41,
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
    width: 10,
    height: 10,
    backgroundColor: "#49eb9f",
    borderRadius: 5,
    marginTop: 5,
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
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
    borderRadius: 10,
  },
});
