import { ContentList, Message, TransformedMessage } from './ChatUI';

export default function splitContent(input: string) {
    const regex = /#(\w+)-list\s*([\s\S]*?)\s*#end-\1-list/g;
    let match;
    const result: { content: string | ContentList; type?: string }[] = [];

    let lastIndex = 0;
    while ((match = regex.exec(input)) !== null) {
        const [fullMatch, , content] = match;

        // Capture text before matched content
        if (match.index > lastIndex) {
            result.push({ content: input.slice(lastIndex, match.index).trim() });
        }

        // Parse JSON content if possible
        let parsedContent;
        try {
            parsedContent = JSON.parse(content);
        } catch {
            parsedContent = content.trim();
        }

        // Capture matched content as a specific type
        result.push({ content: parsedContent, type: "documentJson" });

        lastIndex = match.index + fullMatch.length;
    }

    // Capture remaining text after last match
    if (lastIndex < input.length) {
        const remainingText = input.slice(lastIndex).trim();
        if (remainingText) {
            result.push({ content: remainingText });
        }
    }

    return result;
}

export function splitMessages(messages: Message[]): TransformedMessage[] {
    const finalMessages = messages.flatMap(msg => {
        const splitContentArray = splitContent(msg.content);
        return splitContentArray.map(part => ({
            sender: msg.sender,
            content: part.content,
            type: part.type,
            timestamp: msg.timestamp,
        }));
    });
    console.log(JSON.stringify(finalMessages))
    return finalMessages
}