// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage
const messages = {};
const users = {};

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('admin-connect', () => {
    socket.emit('initial-data', { messages, users });
  });

  socket.on('register-user', ({ userId, userName }) => {
    users[userId] = userName;
    messages[userId] = [];
    io.emit('user-registered', { userId, userName });
  });

  // Listen for new user messages and emit them as 'new-message' to all clients
  socket.on('new-message', (message) => {
    if (!messages[message.userId]) {
      messages[message.userId] = [];
    }
    messages[message.userId].push(message);
    io.emit('new-message', message); // Emit 'new-message' to keep it consistent
  });

  // Listen for admin responses and emit them as 'new-message' to all clients
  socket.on('admin-response', (message) => {
    if (!messages[message.userId]) {
      messages[message.userId] = [];
    }
    messages[message.userId].push(message);
    io.emit('new-message', message); // Emit 'new-message' to keep it consistent
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
