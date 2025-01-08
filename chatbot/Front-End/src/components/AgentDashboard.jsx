// AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const AdminDashboard = () => {
  const [userMessages, setUserMessages] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [response, setResponse] = useState("");
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.emit("admin-connect");

    // Handle initial data
    newSocket.on("initial-data", ({ messages, users }) => {
      setUserMessages(messages || {});
      setUsers(users || {});
    });

    // Handle user registration
    newSocket.on("user-registered", ({ userId, userName }) => {
      setUsers((prev) => ({ ...prev, [userId]: userName }));
      setUserMessages((prev) => ({ ...prev, [userId]: [] }));
    });

    // Handle new messages
    newSocket.on("new-message", (message) => {
      if (!message?.userId) return;

      setUserMessages((prev) => {
        const userMsgs = [...(prev[message.userId] || [])];
        const messageExists = userMsgs.some(
          (msg) => msg.timestamp === message.timestamp && msg.content === message.content
        );

        if (!messageExists) {
          return {
            ...prev,
            [message.userId]: [...userMsgs, message],
          };
        }
        return prev;
      });
    });

    return () => {
      newSocket.off("initial-data");
      newSocket.off("user-registered");
      newSocket.off("new-message");
      newSocket.close();
    };
  }, []);

  const sendResponse = (e) => {
    e.preventDefault();
    if (!response.trim() || !selectedUser || !socket) return;

    const messageData = {
      userId: selectedUser,
      userName: "Admin",
      content: response,
      timestamp: new Date().toISOString(),
      type: "admin",
    };

    socket.emit("admin-response", messageData);
    setResponse("");
  };

  const MessageBubble = ({ message }) => (
    <div
      className={`mb-4 flex ${message.type === "admin" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          message.type === "admin"
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <p className="text-sm font-semibold mb-1">
          {message.type === "admin" ? "Admin" : message.userName}
        </p>
        <div className="break-words">{message.content}</div>
        <div className="text-xs mt-1 opacity-75">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Users Sidebar */}
      <div className="w-1/4 bg-white border-r overflow-y-auto">
        <div className="p-4 bg-blue-500 text-white">
          <h2 className="text-xl font-bold">Active Users</h2>
          <p className="text-sm mt-1">Select a user to view chat</p>
        </div>
        <div className="p-4">
          {Object.entries(users).map(([userId, userName]) => (
            <div
              key={userId}
              onClick={() => setSelectedUser(userId)}
              className={`p-2 cursor-pointer rounded-lg ${
                selectedUser === userId ? "bg-blue-100" : ""
              } hover:bg-blue-50`}
            >
              <div className="flex justify-between items-center">
                <span>{userName}</span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                  {(userMessages[userId] || []).length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col">
        <div className="p-4 bg-blue-500 text-white">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <p className="text-sm">
            {selectedUser
              ? `Chat with ${users[selectedUser]}`
              : "Select a user to view messages"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {selectedUser && userMessages[selectedUser]?.length > 0 ? (
            userMessages[selectedUser].map((message, index) => (
              <MessageBubble
                key={`${message.userId}-${message.timestamp}-${index}`}
                message={message}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              {selectedUser ? "No messages yet" : "Select a user to view messages"}
            </p>
          )}
        </div>

        {selectedUser && (
          <form onSubmit={sendResponse} className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Type a response..."
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
