import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import "./homepage.css";
import { useState } from "react";

export const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("person1");
  const currentYear = new Date().getFullYear();

  return (
    <div className="homepage">
      <img src="/bot.png" alt="" className="background-img" />
      <div className="left">
        <h1>Kode AI</h1>
        <h2>Hello world</h2>
        <h3>
          Welcome! I'm your friendly AI assistant, here to help you find what
          you need on our website. Ask me anything – I'm happy to answer
          questions, guide you to the right products, or even share some fun
          facts. Let's get started!
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "person1"
                  ? "/person1.png"
                  : typingStatus === "person2"
                  ? "/person2.png"
                  : "/bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Person 1: What is data structure?",
                1000,
                () => {
                  setTypingStatus("bot");
                }, // wait 1s before replacing "Mice" with "Hamsters"
                "Bot: Data structure is a way of organizing data in a computer so that it can be used effectively.",
                1000,
                () => {
                  setTypingStatus("person2");
                },
                "Person 2: What is alogrithm?",
                1000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: Algorithm is a set of instructions designed to perform a specific task.",
                1000,
                () => {
                  setTypingStatus("person1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
        <span className="links">
          © {currentYear} Kode AI. All rights reserved.
        </span>
      </div>
    </div>
  );
};
