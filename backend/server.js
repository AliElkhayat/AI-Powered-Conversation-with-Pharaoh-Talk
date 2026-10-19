const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chatRoute = require("./routes/chat");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: [
      "https://pharaoh-talk.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api/chat", chatRoute);

// Export the Express app for Vercel
module.exports = app;

// Run locally
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}