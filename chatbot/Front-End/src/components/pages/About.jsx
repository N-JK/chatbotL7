// import React, { useEffect, useState } from "react";
// import AssemblingPuzzle from "/AssemblingPuzzle.png";
// import Girlkeepingpuzzle from "/Girlkeepingpuzzle.png";
// import FooterImage from "/Footer.png";
// import { FaComments } from 'react-icons/fa'; // Chat icon
// import ChatApp from '../chat';
// // import Carousel from "../Carousel/Carousel";
// // import ContactForm from "../Contacts/ContactForm";

// const About = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleChat = () => setIsOpen(!isOpen);
//   const [showPopup, setShowPopup] = useState(false);

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen max-w-screen-2xl mx-auto">
//       {/* About Us Section */}
//       <div
//         className="flex flex-col md:flex-row items-start px-4 md:px-16 space-y-4 md:space-y-0 md:space-x-8"
//         style={{
//           backgroundImage: `url(${FooterImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <img
//           src={AssemblingPuzzle}
//           alt="Illustration of two people assembling a puzzle"
//           className="mb-8 md:mb-0 md:mr-8 w-full md:w-2/5"
//         />
//         <div className="w-full md:w-3/5" style={{ paddingBottom: "160px" }}>
//           <h1 className="text-3xl md:text-5xl font-bold mb-4">About Us</h1>
//           <p className="text-base md:text-lg mb-8 text-justify">
//             Ladder7, the premier skill development and training division of
//             Neyndra Global Private Limited, is dedicated to empowering
//             individuals in their journey towards personal as well as
//             professional growth. Our training programs focuses on fundamental,
//             transferable, aspirational, and job-specific skills to help the
//             individuals to thrive in today's competitive job market. By
//             enhancing core competencies and well-being, we provide learners with
//             the tools that they need to succeed in their chosen fields,
//             fostering a lifelong commitment to skill improvement and career
//             advancement.
//             <br />
//             <br /> Our outcome-oriented educational approach emphasizes on
//             identifying and developing each learner’s core strengths, setting
//             them up for success in their desired career paths. Through targeted
//             skill-building, we help individuals to achieve their goals and
//             fulfill their aspirations. Ladder7 is committed to bridging up the
//             gap between learning and career readiness, positioning individuals
//             for long-term success in their roles that align with their personal
//             ambitions and professional potential.
//           </p>
//           <button
//             className="bg-[#0067B8] text-white px-6 py-3 rounded-md shadow-md mb-16 md:mb-0" // Increased mb-8 for mobile view
//             onClick={togglePopup}
//           >
//             BOOK A DEMO
//           </button>
//         </div>
//       </div>

//       <div
//         className="px-4 py-16 mt-8" // Consider adjusting the padding to give more space on mobile
//         style={{
//           backgroundImage: `url(${FooterImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           paddingBottom: "160px",
//         }}
//       >
//         <div className="flex flex-col md:flex-row items-start px-4 md:px-16">
//           <div className="w-full md:w-3/5">
//             <div className="mb-6">
//               <h1 className="text-4xl font-bold">Our VISION</h1>
//               <p className="mt-4 text-lg">
//                 Ladder7, the premier skill development and training division of
//                 Neyndra Global Private Limited, is dedicated to empowering
//                 individuals in their journey towards personal as well as
//                 professional growth. Our training programs focuses on
//                 fundamental, transferable, aspirational, and job-specific skills
//                 to help the individuals to thrive in today's competitive job
//                 market. By enhancing core competencies and well-being, we
//                 provide learners with the tools that they need to succeed in
//                 their chosen fields, fostering a lifelong commitment to skill
//                 improvement and career advancement.
//               </p>
//             </div>
//             <div>
//               <h1 className="text-4xl font-bold">Our MISSION</h1>
//               <p className="mt-4 text-lg">
//                 Our outcome-oriented educational approach emphasizes on
//                 identifying and developing each learner’s core strengths,
//                 setting them up for success in their desired career paths.
//                 Through targeted skill-building, we help individuals to achieve
//                 their goals and fulfill their aspirations. Ladder7 is committed
//                 to bridging up the gap between learning and career readiness,
//                 positioning individuals for long-term success in their roles
//                 that align with their personal ambitions and professional
//                 potential.
//               </p>
//             </div>
//           </div>
//           <img
//             src={Girlkeepingpuzzle}
//             alt="Illustration of a person keeping puzzle pieces"
//             className="mb-8 md:mb-0 md:ml-8 w-full md:w-2/5"
//           />
//         </div>
//       </div>

//       {/* Carousel Section */}
//       {/* <div className="mt-4 md:mt-10 px-8 md:px-16 pb-16">
//         <Carousel />
//       </div> */}

//       {/* Contact Form Popup */}
//       {/* {showPopup && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={togglePopup}
//         >
//           <div
//             className="relative p-6 md:mr-0 mr-28 rounded-lg shadow-lg"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <ContactForm />
//           </div>
//         </div>
//       )} */}

// <div>
//       {/* Chat Icon */}
//       <button
//         onClick={toggleChat}
//         type="button" // Prevents form submission behavior
//         className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
//       >
//         <FaComments size={24} />
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-16 right-4 w-72 h-[76vh] bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="flex justify-between items-center bg-blue-500 text-white p-3">
//             <h2>Chat</h2>
//             <button onClick={toggleChat} type="button" className="text-white">X</button>
//           </div>
//           {/* Render ChatApp component inside the chat window */}
//           <div className="h-full overflow-y-auto">
//             <ChatApp />
//           </div>
//         </div>
//       )}
//     </div>

//     </div>
//   );
// };

// export default About;
