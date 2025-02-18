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
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080"); // Adjust the URL as needed

interface Message {
  sender: string;
  content: string;
  timestamp: Date;
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
        <MessageList
          typingIndicator={
            <TypingIndicator content="Terry Crews is thinking" />
          }
        >
          {messages.map((msg, index) => {
            const match = msg.content.match(
              /#contents-list([\s\S]*?)#end-contents-list/
            );
            let contents;
            if (match !== null) contents = JSON.parse(match[1].trim()).contents;
            console.log(contents);
            return (
              <React.Fragment key={index}>
                {index === 0 ||
                new Date(messages[index - 1].timestamp).toDateString() !==
                  new Date(msg.timestamp).toDateString() ? (
                  <MessageSeparator
                    content={new Date(msg.timestamp).toDateString()}
                  />
                ) : null}
                <Message
                  model={{
                    direction:
                      msg.sender === "Terry Crews" ? "incoming" : "outgoing",
                    message: msg.content,
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
