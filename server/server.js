const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Backend is running" });
});

// Agent route
app.post('/run-agent', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/agents/${process.env.AGENT_ID}/interactions`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: userMessage,
          enable_tts: false
        })
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Agent error:", error);
    res.status(500).json({ error: "Agent call failed" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
