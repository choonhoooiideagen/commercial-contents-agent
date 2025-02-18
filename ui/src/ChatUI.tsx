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

const ChatUI = () => {
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
          typingIndicator={<TypingIndicator content="Terry Crews is typing" />}
        >
          <MessageSeparator content="Saturday, 30 November 2019" />
          <Message
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "single",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          >
            <Avatar
              name="Terry Crews"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "single",
              sender: "Oliver",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "first",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "normal",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "normal",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "last",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          >
            <Avatar
              name="Terry Crews"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "first",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "normal",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "normal",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "last",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "first",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "last",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          >
            <Avatar
              name="Terry Crews"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
          <MessageSeparator content="Saturday, 31 November 2019" />
          <Message
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "single",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          >
            <Avatar
              name="Terry Crews"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "single",
              sender: "Oliver",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "first",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "normal",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "normal",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "last",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          >
            <Avatar
              name="Terry Crews"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "first",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "normal",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "normal",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "last",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "first",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "last",
              sender: "Terry Crews",
              sentTime: "15 mins ago",
            }}
          >
            <Avatar
              name="Terry Crews"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
        </MessageList>
        <MessageInput autoFocus placeholder="Type message here" />
      </ChatContainer>
    </div>
  );
};

export default ChatUI;
