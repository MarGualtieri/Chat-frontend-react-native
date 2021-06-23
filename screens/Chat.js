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
        paddingVertical: 5,
        fontWeight: 'normal'
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
    row: {
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
        marginTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
        width: "100%",
        alignContent: "flex-end",
        borderRadius: 50,

    },
    buttonSend: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        marginVertical: 10,
        //backgroundColor: "#cf5475",
        backgroundColor: "#10B981",
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
        borderColor: "pink",
        borderWidth: 1,
        flex: 1,
        width: "100%"
    },
    window: {
        flexDirection: "column",
        padding: 5,
        flex: 1,
        //backgroundColor: "pink",
        backgroundColor: "#cf5475"

    },
    windowInput: {
        flex: 3,
        width: "70%",
        height: "50%",
        paddingBottom: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    textButton: {
        fontSize: 15,
        color: "white",
    },
    myMessage: {
        //backgroundColor: "#cf5475",
        backgroundColor: 'pink',
        padding: 5,
        marginVertical: 8,
        borderRadius: 10,
        marginLeft: 100,
        width: '100%',
        flex: 1
    },
    receiverMessage: {
        marginRight: 0,
        backgroundColor: "#9EE9D0",
        padding: 5,
        marginVertical: 8,
        borderRadius: 10,
        marginRight: 100,

    },
    windowChat: {
        flexDirection: "column",
        height: 500,
        padding: 5,
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10
    },
});
