import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { Component, useEffect, useState } from "react";

import Room from "../components/Room";
import { TouchableOpacity } from "react-native";

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default function Chat({ route, navigation }) {
    const { languageRoom } = route.params;
    const { messages, sendMessage } = Room(languageRoom);
    const [newMessage, setNewMessage] = useState('');

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
      };
    
      const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
      };

  
    const renderItem = ({ item }) => (
        <Item style={item.ownedByCurrentUser ? styles.myMessage : styles.receiverMessage}>
            {item.body}
            {item.senderId}
        </Item>
    );

    return (
        <View style={styles.window}>
            <View style={styles.titleContainer} >
                <Text style={styles.title} > {languageRoom} Room  </Text>
            </View>
            <View style={styles.windowChat}>
                <ScrollView style={styles.messages}>
                    {/* 
                    <FlatList
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    /> */}
                    {messages.map((message, i) => (
                    <Text key={i} style={ message.ownedByCurrentUser ? styles.myMessage : styles.receiverMessage } >
                      {message.body}
                    </Text>
                  ))}
                </ScrollView>
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
    );
}

const styles = StyleSheet.create({
    title: {
        marginRight: 0,
        marginLeft: 0,
        color: "black",
        fontSize: 25,
        paddingLeft: 10

    },
    titleContainer: {
        marginLeft: 0,
        marginTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        flex: 1
    },
    textInput: {
        backgroundColor: "white",
        padding: 0,
        paddingLeft: 20,
        paddingRight: 55,
        borderRadius: 5,
        fontSize: 15,
        height: 300,
        marginVertical: 3,
        marginBottom: 10,
        borderColor: "grey",
        borderWidth: 1,
        flex: 2
    },
    buttonContainer: {
        marginLeft: 0,
        marginTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
        alignContent: "flex-end"
    },
    buttonSend: {
        backgroundColor: "darkturquoise",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        marginVertical: 5,
        height: 40,
        flexDirection: "row",
        borderColor: "lightslategrey",
        flex: 3
    },
    messages: {
        backgroundColor: "white",
        padding: 15,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 3,
        fontSize: 16,
        marginVertical: 3,
        marginBottom: 10,
        borderColor: "grey",
        borderWidth: 1,
        flex: 17
    },
    window: {
        flexDirection: "column",
        height: 500,
        padding: 8,
        flex: 1
    },
    windowInput: {
        flex: 1
    },
    textButton: {
        fontSize: 15,
        color: "white"
    },
    myMessage: {
        marginLeft: 0,
        backgroundColor: "darkturquoise",
        
    },
    receiverMessage: {
        marginRight: 0,
        backgroundColor: "lavender"
    },
    item: {
        marginBottom: 5,
        padding: 3,
        borderRadius: 4,
        color: "white"
    },
    windowChat: {
        flexDirection: "column",
        height: 500,
        padding: 8,
        flex: 10
    },
})