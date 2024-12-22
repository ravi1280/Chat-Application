
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, ToastAndroid } from 'react-native';
import { Pressable } from 'react-native';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import BASE_URL from "./server";
import ErrorAlert from "./Component";
import { ImageBackground } from 'react-native';

export default function ChatScreen ()  {
  const item = useLocalSearchParams();
  console.log(item.other_user_id);

  const [getChatArray, setChatArray] = useState([]);
  const [getChatText, setChatText] = useState([]);

  let requestSender ;

  useEffect(() => {
    async function fetchChatArray() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);
      let response = await fetch(BASE_URL+"/Chatify/UserLoadChat?logUserId=" +
          user.id +
          "&OtherUserId=" +
          item.other_user_id
      );
      if (response.ok) {
        let chatAray = await response.json();
        console.log(chatAray);
        setChatArray(chatAray);
      }
    }
    fetchChatArray();
    if(requestSender==null){
      requestSender=setInterval(fetchChatArray,2000);
    }
    return()=>{
     clearInterval(requestSender);
    };
    // setInterval(()=>{
    //   fetchChatArray();
    // },5000);
  }, []);
 function showToast() {
    ToastAndroid.show("Message Send Success", ToastAndroid.SHORT);
  }

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
  const backgroundImage =  require("../assets/Images/download.jpeg");
  return (
    <LinearGradient colors={["#E6E6FA", "#fff"]} style={styles.container}>
       <StatusBar backgroundColor={"#E6E6FA"} />
      {/* Header */}
      <View style={styles.header}>
      <View >
          <Icon name="arrow-back" size={24} color="#555" onPress={()=>{router.push("/Home");}}/>
        </View>
        
        <Pressable style={styles.profileInfo} onPress={() => {
             router.replace("/UserAccount?other_user_id="+item.other_user_id+"&OtherUserMobile="+item.other_user_mobile+"&OtherUserdate="+item.other_user_JoinDate+"&OtherUserName="+item.other_user_name+"&OtherCountry="+item.other_user_country+"&imageStatus="+item.avatar_image_Found); 
            }}>
          {/*  */}
          {item.avatar_image_Found == "true" ? 
            <Image
              style={styles.profileImage1}
              source={{uri:BASE_URL+"/Chatify/Avartarimages/" +item.other_user_mobile +".png"}}
              contentFit={"contain"}
            />
           : <View style={styles.profileName}>
            <Text style={styles.profileNameText}>{item.other_user_avatar_leters}</Text>
           </View>
            
          }

          <View style={styles.userDetails}>
            <Text style={styles.userName}>{item.other_user_name}</Text>
            {item.other_user_status==1? <Text style={styles.onlineStatus1}>Online</Text>
            :<Text style={styles.onlineStatus2}>Offline</Text>} 
          </View>
        </Pressable>
        
      </View>

      {/* Messages */}
      {/* <ImageBackground source={backgroundImage} resizeMode="cover" style={{flex:1}}> */}
      <FlatList
        data={getChatArray}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          
          <View
            style={[
              styles.messageBubble,
              item.side== "Right" ? styles.senderBubble : styles.receiverBubble,
            ]}
          >
            <Text style={styles.messageText}>{item.message}</Text>
            {item.side=== "Right" ? (
                  item.status === 2 ? (
                    <Icon
                      name="checkmark-outline"
                      size={15}
                      color="#555"
                      style={{ textAlign: "right" }}
                    />
                  ) : (
                    <Icon
                      name="checkmark-done-outline"
                      size={15}
                      color="#555"
                      style={{ textAlign: "right" }}
                    />
                  )
                ) : null}
            
            <Text style={styles.messageTime}>{item.dateTime}</Text>
            
           
        
          </View>
        )} 
        contentContainerStyle={styles.messageList}
      />
      {/* </ImageBackground> */}

      {/* Message Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          value={getChatText}
          placeholder="Type here..."
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={(text) => {
            setChatText(text);
          }}
        />
        
       
        <TouchableOpacity >
          <Pressable onPress={async () => {
            if (getChatText.length == 0) {
              // Alert.alert("error", "masage was empty");
              setAlert("Masage Field Was Empty")
            } else {
              let userJson = await AsyncStorage.getItem("user");
              let user = JSON.parse(userJson);
              let response = await fetch(BASE_URL+"/Chatify/UserSendChat?logUserId="+user.id+"&OtherUserId=" +item.other_user_id+"&message=" +getChatText);
              if (response.ok) {
                let json = await response.json();
                if (json.success) {
                  console.log("success");
                  setChatText("");
                  showToast();
                }
              }
            }
          }}>
          <Icon name="send-outline" size={24} color="#555" style={{ marginLeft: 15 }} />
          </Pressable>
        </TouchableOpacity>
        <ErrorAlert showAlert={showAlert} alertMessage={alertMessage} hideAlert={hideAlert1}/>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  profileImage1:{
    width: 50,
    height: 50,
    borderRadius: 25,
  },

    profileName:{
      justifyContent:"center",
      alignItems:"center",
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth:2,
      borderColor:"#aaa",
      // elevation: 1,
    },
    profileNameText:{
      fontSize:20,

    },
  
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    // paddingTop: 39,
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    columnGap:20,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
    height:80,
    elevation: 5,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  onlineStatus1: {
    color: '#4CAF50',
    fontSize: 12,
  },
  onlineStatus2: {
    color: '#aaa',
    fontSize: 12,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  messageList: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  senderBubble: {
    backgroundColor: '#D1E8FF',
    alignSelf: 'flex-end',
  },
  receiverBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    elevation:5,
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


