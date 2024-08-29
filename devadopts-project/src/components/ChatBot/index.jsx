import React, { useState } from 'react';
import './ChatBot.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

export default function ChatBot() {
    const [typing, setTyping] = useState(false);
    const API_KEY = "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"
    const [messages, setMessages] = useState([
        {
            message: "Hello I am DogoBot. I can help you find you a dog that matches your lifestyle and your personality",
            sender: "ChatGPT",
            direction: "incoming"
        }
    ])
    const handleSend =async (message)=>{
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setTyping(true);
        await ProcessMessageToChatGPT(newMessages)
    }
    async function ProcessMessageToChatGPT(chatMessages){
        let apiMessages = chatMessages.map((messageObject)=>{
            let role = "";
            if(messageObject.sender === "ChatGPT"){
                role="assistant"
            } else {
                role ="user"
            }
            return { role: role, content: messageObject.message}
        });
        const systemMessage = {
            role: "system",
            content: "I am a software which help people to adopt dogs and ask questions about user personalities and where they live so that we can determine which dog matches them"
        }
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }
        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
           return data.json();
        }).then((data) => {
            console.log(data)
        });
    }
    
  return (
    <div style ={{position:"relative", marginTop:"80px", height: "500px", width: "700px"}}>
        <MainContainer>
            <ChatContainer>
                <MessageList
                    typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" />: null}
                >
                    {messages.map((message,i)=>{
                        return <Message key={i} model={message} />
                    })}
                </MessageList>
                <MessageInput placeholder='Type message here' onSend={handleSend}/>
            </ChatContainer>
        </MainContainer>
    </div>
  );
}
