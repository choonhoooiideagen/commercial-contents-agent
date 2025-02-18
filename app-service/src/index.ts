import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import { Message } from './types';

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
  res.json([
    {
      sender: "Terry Crews",
      content: "Hey Oliver, how's it going?",
      timestamp: new Date("2023-10-01T10:00:00Z"),
    },
    {
      sender: "You",
      content: "Hi Terry, I'm doing well! How about you?",
      timestamp: new Date("2023-10-01T10:05:00Z"),
    },
    {
      sender: "Terry Crews",
      content: "I'm great, thanks for asking!",
      timestamp: new Date("2023-10-01T10:10:00Z"),
    },
    {
      sender: "Terry Crews",
      content: "What have you been up to lately?",
      timestamp: new Date("2023-10-01T10:15:00Z"),
    },
    {
      sender: "You",
      content: "I've been working on a new project. It's been keeping me busy!",
      timestamp: new Date("2023-10-01T10:20:00Z"),
    },
    {
      sender: "Terry Crews",
      content: "That's great to hear! What kind of project is it?",
      timestamp: new Date("2023-10-01T10:25:00Z"),
    },
    {
      sender: "You",
      content: "It's a mobile app that helps people learn new languages.",
      timestamp: new Date("2023-10-01T10:30:00Z"),
    },
    {
      sender: "Terry Crews",
      content: "Wow, that sounds interesting! I'd love to try it out sometime.",
      timestamp: new Date("2023-10-01T10:35:00Z"),
    },
    {
      sender: "You",
      content: "Sure, I'll send you a link when it's ready.",
      timestamp: new Date("2023-10-01T10:40:00Z"),
    },
    {
      sender: "Terry Crews",
      content: `Looking forward to it, lol! Below is the list of contents that you can subscribe / purchase
        #contents-list
        {
        "contents": [
          {
            "id": 1,
            "title": "Learn Spanish",
            "price": 10
            
          }
        ]
        }
        #end-contents-list
      `,
      timestamp: new Date("2023-10-02T09:00:00Z"),
    },
  ]);
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

  socket.on("sendMessage", (message) => {
    message.timestamp = new Date();
    messages.push(message);

    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // setInterval(() => {
  //   const message: Message = {
  //     sender: "Terry Crews",
  //     content: "This is a random message from Terry Crews!",
  //     timestamp: new Date()
  //   };

  //   messages.push(message);
  //   io.emit("receiveMessage", message);
  // }, 5000);
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
