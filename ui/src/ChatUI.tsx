import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { splitMessages } from "./splitContent";
const socket = io("http://localhost:8080"); // Adjust the URL as needed

export interface Message {
  sender: string;
  content: string;
  timestamp: Date;
  type?: string;
}

export interface TransformedMessage {
  sender: string;
  content: string | ContentList;
  timestamp: Date;
  type?: string;
}

export interface ContentList {
  contents: {
    id: string;
    title: string;
    price: number;
    summary: string;
    path: string;
  }[];
}

const ChatUI = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/messages/all`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(
          data.map((msg: Message) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        );
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSendMessage = (content: string) => {
    const message = {
      sender: "You",
      content,
      timestamp: new Date(),
    };
    socket.emit("sendMessage", message);
  };

  const getChatType = (msg: TransformedMessage) => {
    switch (msg.type) {
      case undefined:
        return (
          <Message
            model={{
              direction: msg.sender === "Terry Crews" ? "incoming" : "outgoing",
              message: msg.content as string,
              position: "single",
              sender: msg.sender,
              sentTime: new Date(msg.timestamp).toLocaleTimeString(),
            }}
          >
            <Avatar
              name="Terry Crews"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
        );
      case "documentJson":
        console.log(msg.content);
        return (
          <Message
            model={{
              direction: msg.sender === "Terry Crews" ? "incoming" : "outgoing",
              message: "",
              position: "single",
              sender: msg.sender,
              sentTime: new Date(msg.timestamp).toLocaleTimeString(),
            }}
          >
            <Message.HtmlContent
              html={`<div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #f5f5f5;">
              ${(typeof msg.content !== "string" &&
              Array.isArray(msg.content.contents)
                ? msg.content.contents
                : []
              )
                .map(
                  (content) => `
              <a target="_blank" href="http://localhost:8000/BP240%20Electrical%20Utility%20Risk%20Assessment.pdf" style="flex: 1 1 calc(50% - 20px); box-sizing: border-box; margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 12px; background-color: #fff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-decoration: none; color: inherit; transition: transform 0.2s, box-shadow 0.2s; max-width: 360px;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 8px rgba(0, 0, 0, 0.2)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 4px rgba(0, 0, 0, 0.1)';">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHs_cgvazTAA5aNsSFUFkEbOtB_T3B-M81xg&s" alt="${
                    content.title
                  }" style="width: 50%; height: auto; border-radius: 12px 12px 0 0; display: block; margin: 0 auto;"/>
              <h3 style="margin: 10px 0; font-size: 1.2em; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${
                content.title
              }</h3>
              <p style="margin: 0 0 10px 0; font-size: 1em; color: #666;">Price: <span style="font-weight: bold; color: #000;">$${
                content.price
              }</span></p>
              <p style="margin: 0 0 10px 0; font-size: 1em; color: #666; min-height: 80px;">Summary: ${
                content.summary
              }</p>
              <button style="padding: 10px 20px; border: none; border-radius: 5px; background-color: ${
                Math.random() > 0.5 ? "#007bff" : "#28a745"
              }; color: #fff; cursor: pointer; margin-top: 10px; display: block; margin: 0 auto;">${
                    Math.random() > 0.5 ? "Purchase" : "Access"
                  }</button>
              </a>`
                )
                .join("")}
              </div>`}
            />
          </Message>
        );
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ChatContainer
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <ConversationHeader>
          <Avatar
            name="Terry Crews"
            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
          />
          <ConversationHeader.Content
            info="Active 10 mins ago"
            userName="Terry Crews"
          />
          <ConversationHeader.Actions>
            <VoiceCallButton />
            <VideoCallButton />
            <InfoButton />
          </ConversationHeader.Actions>
        </ConversationHeader>
        <MessageList>
          {splitMessages(messages).map((msg, index) => {
            return (
              <React.Fragment key={index}>
                {index === 0 ||
                new Date(
                  splitMessages(messages)[index - 1].timestamp
                ).toDateString() !== new Date(msg.timestamp).toDateString() ? (
                  <MessageSeparator
                    content={new Date(msg.timestamp).toDateString()}
                  />
                ) : null}
                {getChatType(msg)}
              </React.Fragment>
            );
          })}
        </MessageList>
        <MessageInput
          autoFocus
          placeholder="Type message here"
          onSend={handleSendMessage}
        />
      </ChatContainer>
    </div>
  );
};

export default ChatUI;
