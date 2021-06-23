import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Component, useEffect, useRef, useState } from "react";

import Room from "../components/Room";
import { TouchableOpacity } from "react-native";

const Item = ({ title, user }) => (
  <View style={user ? styles.myMessage : styles.receiverMessage}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function Chat({ route, navigation }) {
  const { languageRoom } = route.params;
  const { messages, sendMessage } = Room(languageRoom);
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  const renderItem = ({ item }) => (
    <Item title={item.body} user={item.ownedByCurrentUser} />
  );
  const scrollRef = useRef();
  return (
    <View style={styles.window}>
      <View >
        <Text style={styles.titleRoom}> {languageRoom} Room </Text>
      </View>
      <View style={styles.windowChat}>
        <ScrollView style={styles.messages}>
          
          
        <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
       
      />
          
        </ScrollView >
        <View style={styles.row}>
        <View style={styles.windowInput}>
          <TextInput
            placeholder="Type a message..."
            type="text"
            value={newMessage}
            style={styles.textInput}
            onChange={handleNewMessageChange}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.buttonSend}
          >
            <Text style={styles.textButton}>Send</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRoom: {
    marginRight: 0,
    marginLeft: 0,
    color: "white",
    fontSize: 25,
    paddingLeft: 5,
    paddingVertical:5
  },
  titleContainer: {
    marginLeft: 0,
    marginTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  row:{
    flexDirection: "row",
    alignItems: "center",
    display: "flex",

  },
  textInput: {
    backgroundColor: "white",
    padding: 0,
    paddingLeft: 20,
    paddingRight: 55,
    borderRadius: 5,
    fontSize: 15,
    height: 100,
    marginVertical: 0,
    marginBottom: -20,
    borderColor: "grey",
    borderWidth: 1,
    flex: 1,
  },
  buttonContainer: {
    //marginLeft: 200,
    marginTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    alignContent: "flex-end",
    borderRadius:50,
   
  },
  buttonSend: {
    backgroundColor: "#cf5475",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginVertical: 10,
    backgroundColor:"green",
    height: 40,
    flexDirection: "row",
    borderColor: "lightslategrey",
    flex: 3,
  },
  messages: {
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    fontSize: 16,
    marginVertical: 3,
    marginBottom: 10,
    borderColor: "coral",
    borderWidth: 1,
    flex: 1,
    width:"100%"
  },
  window: {
    flexDirection: "column",
    padding: 5,
    flex: 1,
    backgroundColor: "coral"
    
  },
  windowInput: {
    flex: 3,
    width: "70%",
    height: "50%",
    backgroundColor: "blue",
    paddingBottom:10,
    marginBottom:10

    
  },
  textButton: {
    fontSize: 15,
    color: "white",
  },
  myMessage: {
    borderColor: "red",
    backgroundColor: "#dddddd",
    padding: 5,
    marginVertical: 8,
    borderRadius:10,
    marginLeft: 100,
    
    width:'100%',
    flex:1
  },
  receiverMessage: {
    marginRight: 0,
    backgroundColor: "#d0fdea",
    padding: 5,
    marginVertical: 8,
    //marginHorizontal: 5,
    
    borderRadius:10,
    marginRight: 100,
    
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "blue"
  },
  windowChat: {
    flexDirection: "column",
    height: 500,
    padding: 5,
    flex: 1,
    backgroundColor: "pink"
  },
});
