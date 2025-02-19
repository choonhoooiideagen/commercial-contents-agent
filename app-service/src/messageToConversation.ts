import { Message } from './types';

export default function convertToConversationHistory(messages: Message[]): string {
    return JSON.stringify(
        messages.map((message) => {
            const role = message.sender === "You" ? "user" : "system";
            return { role, content: message.content, timestamp: message.timestamp };
        }),
        null,
        2
    );
}
