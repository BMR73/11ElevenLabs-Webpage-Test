import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/run-agent", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/agents/${process.env.AGENT_ID}/run`,
      { input: userMessage },
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Agent call failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
