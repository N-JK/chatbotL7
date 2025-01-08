import React, { useState, useEffect, useRef } from "react";
import { FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "/Ladder7.png";


const productDescriptions = {
  "My Ladder": {
    description:
      "MyLadder is a step-by-step program that helps individuals set and achieve career goals aligned with their skills and aspirations.",
    navigateTo: "/admin",
  },
  "Mind Gym": {
    description:
      "An interactive program focused on enhancing mental well-being through targeted exercises in stress management and decision-making.",
    navigateTo: "/myndgym",
  },
  "Mirror Me": {
    description:
      "A self-reflection program designed to help individuals understand their talents, IQ, emotional intelligence (EQ), and personal goals.",
    navigateTo: "/mirrorme",
  },
  "Fill Dots": {
    description:
      "A program designed to bridge skill gaps and help individuals advance in their careers.",
    navigateTo: "/filldots",
  },
  "Programs": {
    isExpandable: true,
    subItems: [
      {
        name: "Junior Web Developer (MERN Stack - Multistream)",
        description:
          "Unlock your potential as a junior web developer and AI enthusiast with our Web Development & AI Accelerator (WDAA) program.",
        navigateTo: "/programs/mernstack",
      },
      {
        name: "Junior Data Scientist",
        description:
          "The Junior Data Scientist program trains aspiring professionals in data analysis, machine learning, and visualization.",
        navigateTo: "/programs/datascientist",
      },
      {
        name: "Digital Marketing Associate",
        description:
          "The Digital Marketing Associate program provides essential skills for success in digital marketing. Covering SEO, social media marketing, content creation, and analytics, it prepares individuals to develop effective online marketing strategies.",
        navigateTo: "/programs/digitalmarketing",
      },
      {
        name: "Junior Mobile App Developer",
        description:
          "The Junior Mobile App Developer program is designed for beginners to build foundational skills in mobile app development. Participants will learn app design, development, and testing for Android and iOS, using industry-standard tools.",
        navigateTo: "/programs/mobileappdev",
      },
      {
        name: "Junior CyberSecurity Analyst",
        description:
          "The Junior Cybersecurity Analyst program equips participants with expert-level skills to protect digital assets and prevent cyber threats.",
        navigateTo: "/programs/cybersecurity",
      },
      {
        name: "Junior Data Analyst",
        description:
          "The Junior Data Analyst course offers foundational skills in data analysis, teaching participants how to analyze and interpret data effectively.",
        navigateTo: "/programs/dataanalyst",
      },
      {
        name: "Junior HR Talent Manager",
        description:
          "The Junior HR Talent Manager program provides aspiring HR professionals with essential skills in talent acquisition, employee engagement, and core HR processes.",
        navigateTo: "/programs/hrtalentmanager",
      },
      {
        name: "Salesforce Developer",
        description:
          "The Salesforce Developer program provides essential skills in Salesforce development, including Apex programming, Lightning Web Components, and database management.",
        navigateTo: "/programs/salesforcedev",
      },
      {
        name: "Adobe Experience Manager (AEM) Author",
        description:
          "The AEM Author program provides essential skills to create, edit, and manage content using Adobe Experience Manager (AEM).",
        navigateTo: "/programs/aem",
      },
    ],
  },
};

const ChatApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [step, setStep] = useState("welcome");
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" });
  const [selectedProgram, setSelectedProgram] = useState(null);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Only scroll if the last message is not a program listing
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && step !== "selectProgram" && step !== "selectSubProgram") {
      scrollToBottom();
    }
  }, [messages, step]);

  useEffect(() => {
    if (isOpen && step === "welcome") {
      setMessages([
        { content: "Hi, Welcome to Ladder7 Support! How can I assist you For The Day?", type: "admin" },
        { content: "Start", type: "button" },
      ]);
    }
  }, [isOpen]);

  const showAllPrograms = () => {
    const programButtons = ["My Ladder", "Mind Gym", "Mirror Me", "Fill Dots", "Programs"].map((program) => ({
      content: program,
      type: "button",
    }));
    setMessages((prev) => [
      ...prev,
      { content: "Here are our main programs:", type: "admin" },
      ...programButtons,
    ]);
    setStep("selectProgram");
  };

  const handleButtonClick = (buttonText,navigateTo) => {
    setMessages((prev) => [...prev, { content: buttonText, type: "user" }]);

    if (navigateTo) {
      navigate(navigateTo);
      setIsOpen(false);
      return;
    }

    if (buttonText === "Start") {
      setMessages((prev) => [
        ...prev,
        { content: "Please provide your name:", type: "admin" },
      ]);
      setStep("askName");
    } else if (buttonText === "Programs") {
      handleProgramSelection("Programs");
    } else if (step === "selectProgram") {
      handleProgramSelection(buttonText);
    } else if (step === "selectSubProgram") {
      handleSubProgramSelection(buttonText);
    }
  };

  const handleUserInput = (e) => {
    e.preventDefault();
    const input = newMessage.trim();
    if (!input) return;
    setMessages((prev) => [...prev, { content: input, type: "user" }]);
    setNewMessage("");
  
    if (step === "askName") {
      if (!/^[a-zA-Z\s]+$/.test(input)) {
        setMessages((prev) => [
          ...prev,
          {
            content:
              "Invalid Name. Please enter a Valid Name Without Numbers or Special characters.",
            type: "admin",
          },
        ]);
        return;
      }
      setContactInfo((prev) => ({ ...prev, name: input }));
      setMessages((prev) => [
        ...prev,
        { content: "Please Enter your Email Address:", type: "admin" },
      ]);
      setStep("askEmail");
      setTimeout(scrollToBottom, 100);
    } else if (step === "askEmail") {
      // Validate email: standard email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        setMessages((prev) => [
          ...prev,
          {
            content:
              "Invalid Email Format. Please Enter a Valid Email Address (e.g., example@example.com).",
            type: "admin",
          },
        ]);
        return;
      }
      setContactInfo((prev) => ({ ...prev, email: input }));
      setMessages((prev) => [
        ...prev,
        { content: "Please Enter your Phone Number:", type: "admin" },
      ]);
      setStep("askPhone");
      setTimeout(scrollToBottom, 100);
    } else if (step === "askPhone") {
      // Validate phone: exactly 10 digits
      if (!/^\d{10}$/.test(input)) {
        setMessages((prev) => [
          ...prev,
          {
            content:
              "Invalid Phone number. Please Enter a 10-digit Phone Number (e.g., 1234567890).",
            type: "admin",
          },
        ]);
        return;
      }
      setContactInfo((prev) => ({ ...prev, phone: input }));
      showAllPrograms();
      setTimeout(scrollToBottom, 100);
    }
  };
  
  
  const scrollToContent = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const maxScrollPosition = container.scrollHeight - container.clientHeight;

     
      container.scrollTo({
        top: maxScrollPosition - 205, 
        behavior: "smooth",
      });
    }
  };

  const handleProgramSelection = (programName) => {
    const program = productDescriptions[programName];

    if (!program) {
      console.error(`Program "${programName}" not found in productDescriptions.`);
      setMessages((prev) => [
        ...prev,
        { content: `Sorry, we couldn't find the program "${programName}".`, type: "admin" },
      ]);
      return;
    }
  
    if (programName === "Programs") {
      const subItemsButtons = program.subItems.map((subItem) => ({
        content: subItem.name,
        type: "button",
      }));
      setMessages((prev) => [
        ...prev,
        { content: "Here are our specialized programs:", type: "admin" },
        ...subItemsButtons,
      ]);
      setSelectedProgram(programName);
      setStep("selectSubProgram");
      setTimeout(scrollToContent, 100);

    } 
    else {
      setMessages((prev) => [
        ...prev,
        { content: program.description, type: "admin" },
        {
          content: "Learn More",
          type: "button",
          navigateTo: program.navigateTo,
        },
      ]);
      showAllPrograms();
    
      setTimeout(scrollToContent, 100);
    }
};

  const handleSubProgramSelection = (subProgramName) => {
    const mainProgram = productDescriptions[selectedProgram];

    if (!mainProgram) {
      console.error(`Main program "${selectedProgram}" not found in productDescriptions.`);
      return;
    }
  
    const subProgram = mainProgram.subItems?.find((item) => item.name === subProgramName);
  
    if (!subProgram) {
      console.error(
        `Subprogram "${subProgramName}" not found under program "${selectedProgram}".`
      );
      setMessages((prev) => [
        ...prev,
        { content: `Sorry, we couldn't find the subprogram "${subProgramName}".`, type: "admin" },
      ]);
      return;
    }
  
    setMessages((prev) => [
      ...prev,
      { content: subProgram.description, type: "admin" },
      {
        content: "Learn More",
        type: "button",
        navigateTo: subProgram.navigateTo,
      },
    ]);
    showAllPrograms();
    setTimeout(scrollToContent, 200);
  };
  

  return (
    <>
      <div className="fixed bottom-4 right-8 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
        >
          <FaComments size={24} />
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-16 right-16 z-50 w-[350px] h-[500px] shadow-lg rounded-lg flex flex-col bg-white">
          <div className="bg-blue-600 text-white p-4 relative rounded-lg">
            <button
              className="absolute top-4 right-6 text-white bg-transparent text-lg font-bold"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
            <div className="flex items-center space-x-3">
       
        <img src={logo} alt="Logo" className="w-20 h-16" />

        <h2 className="text-xl font-bold">Ladder7 Support</h2>
      </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4" ref={messagesContainerRef}>
            {messages.map((msg, index) => {
              if (msg.type === "button") {
                return (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(msg.content, msg.navigateTo || null)}
                    className="block w-full text-center px-3 py-2 mb-2 rounded-lg bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    {msg.content}
                  </button>
                );
              }

              return (
                <div
                  key={index}
                  className={`mb-4 ${msg.type === "user" ? "text-right" : ""}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg shadow-sm ${
                      msg.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleUserInput} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder={
                  step === "askName"
                    ? "Enter Your Name"
                    : step === "askEmail"
                    ? "Enter Your Email"
                    : step === "askPhone"
                    ? "Enter Your Phone Number"
                    : "Type your message..."
                }
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatApp;