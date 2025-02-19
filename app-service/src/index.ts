import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import { Message } from './types';
import convertToConversationHistory from './messageToConversation';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const messages: Message[] = [];

// Routes
app.get("/", (_: Request, res: Response) => {
  res.json({ message: "Hello, Express + TypeScript!" });
});

app.get("/messages/all", (_: Request, res: Response) => {
  res.json(messages);
});

// Socket IO

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("sendMessage", async (message) => {
    message.timestamp = new Date();
    messages.push(message);

    io.emit("receiveMessage", message);

    try {
      const response = await fetch("http://ai-service:5000/invoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: message.content,
          conversationHistory: convertToConversationHistory(messages)
        })
      });

      const data = await response.json();
      if (data.response) {
        const aiMessage: Message = {
          sender: "Terry Crews",
          content: data.response,
          timestamp: new Date()
        };

        messages.push(aiMessage);
        io.emit("receiveMessage", aiMessage);
      }
    } catch (error) {
      console.error("Error invoking AI agent:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

});

// Start Server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
