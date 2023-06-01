import { useState, useRef, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcomeview from "./components/WelcomeView";
import Message from "./components/message";
import IsTypingView from "./components/isTypingView";
import MessageList from "./components/MessageList";
import axios from "axios";
import useToast from "./hooks/useToast";

const API_KEY = import.meta.env.VITE_API_KEY;
const initialChats = JSON.parse(localStorage.getItem("Chats")) || [];

function App() {
  const [messages, setMessages] = useState(initialChats);
  const [isTyping, setIsTyping] = useState(false);
  const { error, success } = useToast();

  useEffect(() => {
    localStorage.setItem("Chats", JSON.stringify(messages));
  }, [messages]);
  function getDateSendChat() {
    let today = new Date().toLocaleDateString("fa-IR");

    const hr = new Date().getHours();
    const min = new Date().getMinutes();
    const time = hr + ":" + min;

    return time;
  }
  const handleSend = async (message) => {
    if (message === "") {
      error("Please enter your text");
      return;
    }

    const newMessage = {
      id: Math.floor(Math.random() * 100),
      message,
      direction: "outgoing",
      sendTime: getDateSendChat(),
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };
  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [...apiMessages],
    };

    try {
      await axios
        .post(
          "https://api.openai.com/v1/chat/completions",
          JSON.stringify(apiRequestBody),
          {
            headers: {
              Authorization: "Bearer " + API_KEY,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          navigator.vibrate(200);
          setMessages([
            ...chatMessages,
            {
              message: res.data.choices[0].message.content,
              direction: "incoming",
              sendTime: getDateSendChat(),
              sender: "ChatGPT",
            },
          ]);
          setIsTyping(false);
        });
    } catch (error) {
      error("Connection failed");
      setIsTyping(false);
    }
  }
  const handleDeleteAllChats = () => {
    if (messages.length == 0) {
      error("There is no chat");
      return;
    }

    setMessages([]);
    success("Chats are deleted");
  };
  const handleDeleteMessage = (id) => {
    const messagesFilter = messages.filter((message) => message.id !== id);
    setMessages(messagesFilter);
  };

  return (
    <div className="w-full bg-gray-100">
      <div className="w-full h-screen mx-auto flex flex-col justify-between">
        <Header onDeleteChats={handleDeleteAllChats} />
        <MessageList>
          {/* Messages */}
          {messages.length ? (
            messages.map((message) => {
              return (
                <Message
                  key={message.id}
                  message={message}
                  deleteMessage={handleDeleteMessage}
                />
              );
            })
          ) : (
            <Welcomeview />
          )}
          {/* Loading */}
          {isTyping && <IsTypingView />}
        </MessageList>
        <Footer onSend={handleSend} />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
