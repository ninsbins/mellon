import React, {useEffect, useState} from 'react';
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import {Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import Header from "../components/Header";
import {Col, Container, Nav, Row, Tab} from "react-bootstrap";
import MessagingChannelList from '../components/MessagingChannelList';


import 'stream-chat-css/dist/css/index.css';
import "../styles/Chat.css";

import authService from "../services/authService";
import axiosConfig from "../services/axiosConfig";


const apiKey = '5yqbauter4s3';
const client = StreamChat.getInstance('5yqbauter4s3');

let authToken = false;

const ChatPage = ({chatWithUser}) => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [theme, setTheme] = useState('light');
    const [chatClient, setChatClient] = useState(null);

    const sort = { last_message_at: -1};

    /*client.connectUser({
        id: authService.getCurrentUser().username,
        name: authService.getCurrentUser().username,
        image: 'test-image'
    },
        client.devToken(authService.getCurrentUser().username));*/

    useEffect(() => {
        console.log(chatWithUser);
        const initChat = async () => {
            const client = StreamChat.getInstance(apiKey);
            await client.connectUser({
                    id: authService.getCurrentUser().username,
                    name: authService.getCurrentUser().username,
                    image: 'test-image'
                },
                client.devToken(authService.getCurrentUser().username));
            setChatClient(client);
        };

        initChat();

        return () => chatClient?.disconnectUser();
    }, []);

    if (!chatClient) return null;



    return (
        <div>
            <Header />
            <Container fluid className={"content-body"}>
                <Container className={"rounded-card"}>
                    <Chat client={chatClient}>
                        <ChannelList
                            filters={{}}
                            sort={sort}
                            options={{}}
                            List={(props) => (
                                <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} />
                            )}
                        />
                        <Channel>
                            <Window>
                                <ChannelHeader />
                                <MessageList />
                                <MessageInput />
                            </Window>
                        </Channel>
                    </Chat>
                </Container>

            </Container>
        </div>
    );
}

export default ChatPage;