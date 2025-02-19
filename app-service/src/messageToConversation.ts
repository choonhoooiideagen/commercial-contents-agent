import { Message } from './types';

export default function convertToConversationHistory(messages: Message[]) {
    return messages.map((message) => {
        const role = message.sender === "You" ? "user" : "system";
        return { role, content: message.content, timestamp: message.timestamp };
    });
}
