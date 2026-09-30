import express from "express";
import cors from "cors";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-node";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY
});

app.post("/run-agent", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.agents.run({
      agentId: process.env.AGENT_ID,
      input: userMessage
    });

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Agent call failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

