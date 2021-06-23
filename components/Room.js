import { useEffect, useRef, useState } from "react";

import io from "socket.io-client";

const socket_url = "https://apichathello.herokuapp.com/";

export default function Room(languageRoom) {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    

    useEffect(() => {
        socketRef.current = io(socket_url, {
            query: { languageRoom },
        })

        socketRef.current.on('chat message', (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id
            }
            console.log(messages)
            setMessages((messages) => [...messages, incomingMessage]);
            
        })
        return () => {
            socketRef.current.disconnect();
        };
    }, [languageRoom]);

    const sendMessage = (messageBody) => {
        socketRef.current.emit('chat message', {
            body: messageBody,
            senderId: socketRef.current.id
        });
    };

    return { messages, sendMessage };
};


