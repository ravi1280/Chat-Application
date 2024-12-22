import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';


export default function ReplyPopup  () {
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');

//   const emojis = ["🔥", "🙌", "😭", "🙈", "🙏", "😠", "👍"];

  return (
    <View style={styles.container}>
      {/* Trigger Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.replyButton}>
        <Text style={styles.replyText}>+ Reply</Text>
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal
        animationType="slide" 
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* User Comment */}
            <Text style={styles.comment}>Cakep banget ini taneman, cocok bgt</Text>

          

            {/* Comment Input */}
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Comment"
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity style={styles.iconButton}>
                {/* Camera Icon */}
                <Image
                  source={require('../assets/Images/ChatIcon.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                {/* Mic Icon */}
                <Image
                  source={require('../assets/Images/ChatIcon.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyButton: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 30,
  },
  replyText: {
    fontSize: 16,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  comment: {
    fontSize: 16,
    marginBottom: 15,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  emojiButton: {
    padding: 5,
  },
  emojiIcon: {
    fontSize: 25,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#999',
  },
});


