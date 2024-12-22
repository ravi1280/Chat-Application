import React from 'react';
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons

export default function ChatAppDesign () {
  // Sample data for favorite and last chats
  const favoriteChats = [
    { name: 'James', image: require('../assets/Images/User1.jpg') }, // Add your images
    { name: 'Liam', image: require('../assets/Images/User1.jpg') },
    { name: 'Mason', image: require('../assets/Images/User1.jpg') },
    { name: 'Olivia', image: require('../assets/Images/User1.jpg') },
  ];

  const lastChats = [
    { name: 'Mari', message: 'Honey, I miss you so much', time: '16:21', unread: true },
    { name: 'Emma', message: 'Concert was amazing. I need to talk...', time: '13:54', unread: false },
    { name: 'Sophia', message: 'I really love that! Thank you...', time: '11:08', unread: false },
    { name: 'Ethan', message: 'No probs. Would you like to...', time: '10:30', unread: false },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="menu" size={30} color="#fff" />
        <Text style={styles.headerTitle}>Messages</Text>
        <Icon name="search" size={30} color="#fff" />
      </View>

      {/* Favorite Chats */}
      <View style={styles.sectionTitle}>
        <Text style={styles.titleText}>Favorite Chats</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favoriteChats}>
        {favoriteChats.map((chat, index) => (
          <View key={index} style={styles.favoriteChatItem}>
            <Image source={chat.image} style={styles.chatAvatar} />
            <Text>{chat.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Last Chats */}
      <View style={styles.sectionTitle}>
        <Text style={styles.titleText}>Last Chats</Text>
      </View>
      <FlatList
        data={lastChats}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <Image source={require('../assets/Images/User1.jpg')} style={styles.chatAvatar} />
            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage}>{item.message}</Text>
            </View>
            <Text style={styles.chatTime}>{item.time}</Text>
            {item.unread && <View style={styles.unreadIndicator} />}
            <TouchableOpacity>
              <Icon name="trash" size={25} color="#f00" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Voice Control Section */}
      <View style={styles.voiceControl}>
        <View style={styles.waveform} />
        <TouchableOpacity style={styles.playButton}>
          <Icon name="play" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#7B49F2', // Purple background
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoriteChats: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  favoriteChatItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  chatAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chatDetails: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatMessage: {
    color: '#888',
  },
  chatTime: {
    color: '#888',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
    marginLeft: 10,
  },
  voiceControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#F7F7F7',
  },
  waveform: {
    width: '70%',
    height: 5,
    backgroundColor: '#DDD',
    borderRadius: 5,
  },
  playButton: {
    width: 60,
    height: 60,
    backgroundColor: '#7B49F2',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

