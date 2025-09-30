import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";
import { Link } from "react-router-dom"
import logo from "../assets/img/EY-GPT.webp"

const Chat = () => {
  const functionUrl = import.meta.env.VITE_API_URL + "/api/chat"

  const [messages, setMessages] = useState([
    {
      text: "sample Messages",
      sender: "ai"
    },
    {
      text: "sample Messages",
      sender: "user"
    }
  ])

  const [newInputValue, setNewInputValue] = useState("")
  const [loading, setLoading] = useState(false)

  console.log(newInputValue)

  const newMessage = async (e) => {
    e.preventDefault()


    setLoading(true)

// make the input impty
    setNewInputValue("");

    // add the user message
    const newMessages = [
      ...messages,
      {
        text: newInputValue,
        sender: "user",
      },
    ];
    setMessages(newMessages);

    try {
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

// add ai message
      setMessages([
        ...newMessages,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      toast.error(<span>The Eye of Horus <span style={{ color: "gold", fontSize: "1.2rem" }}>𓂀</span>   couldn’t see your message .</span>
, {
  style: {
    background: "#1e1e2f",
    color: "#fff",
    borderRadius: "12px",
    fontSize: "14px",
  },
  className: "shadow-lg border border-white/10 backdrop-blur-md"})

      console.error("Error sending message:", error);
    }
    setLoading(false);

  };



  const messagesEndRef = useRef(null);
// scroll to the last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  return (
    <>
      <main className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-20 absolute top-0 left-0 z-20"
          />
        </Link>

        {/* Chat Container */}
        <div className="relative z-10 w-full max-w-2xl flex flex-col 
                  bg-white/10 backdrop-blur-md rounded-2xl 
                  shadow-2xl p-6 h-[80vh]">

          <h1 className="text-4xl font-extrabold mb-4 text-center text-white drop-shadow-lg">
            Welcome to the <span className="text-amber-400">Pharaoh's Chat</span>
          </h1>

          {/* Messages Container */}
          <div
            className="flex-1 overflow-y-auto space-y-3 p-4 
                       bg-black/40 rounded-lg border border-yellow-500/30 
                       [scrollbar-width:thin]  [scrollbar-color:#4b5563_#1f1f1f]   [scroll-behavior:smooth]"
          >
            {messages.slice(2).map((message, index) => (
              <p
                key={index}
                className={`px-4 py-2 rounded-xl max-w-[75%] w-fit break-words shadow-md ${message.sender === "user"
                  ? "ml-auto bg-gradient-to-r from-black via-gray-900 to-black text-white border border-yellow-500 shadow-yellow-500/30"
                  : "mr-auto bg-white/20 text-white border border-gray-400/30"
                  }`}
              >
                {message.text}
              </p>
            ))}
            {loading && <p className="text-gray-400 italic">AI is thinking...</p>}

            {/*  ref */}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="mt-4 flex items-center gap-2"
            onSubmit={newMessage}
          >
            <input
              type="text"
              placeholder="Message"
              value={newInputValue}
              disabled={loading}
              name="userMessage"
              onChange={(e) => setNewInputValue(e.currentTarget.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-black/60 
                   border border-yellow-500/30 text-white 
                   placeholder-gray-400 focus:outline-none 
                   focus:ring-2 focus:ring-amber-400"

            />
            <button
              type="submit"
              
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-black via-gray-900 to-black 
                   border border-yellow-500 shadow-lg shadow-yellow-500/30 
                   hover:shadow-yellow-400/60 hover:scale-105 
                   transition-all duration-300"
            >{loading ? "Loading..." : "Send"}</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Chat;
