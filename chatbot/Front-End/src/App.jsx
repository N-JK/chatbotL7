import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatApp from './components/chat';
import AdminDashboard from './components/AgentDashboard';
import Chatbot from './components/Chatbot';
// import About from './components/pages/About';

function App() {
  return (
    <Router>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<ChatApp />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path='/bot' element={<Chatbot />} />
          {/* <Route path='/about' element={<About />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;