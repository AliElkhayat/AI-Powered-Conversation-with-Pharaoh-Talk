const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chatRoute = require("./routes/chat");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors({ origin: "https://ai-powered-conversation-with-pharao.vercel.app/" })); 
app.use(express.json());

// routes
app.use("/api/chat", chatRoute);

export default app;

