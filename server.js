import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/yorum", async (req, res) => {
  const { matrix } = req.body;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a spiritual destiny matrix expert." },
          { role: "user", content: `Interpret this destiny matrix: ${JSON.stringify(matrix)}` }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_KEY}`
        }
      }
    );

    res.json(response.data.choices[0].message.content);
  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json("Error");
  }
});

app.listen(3000, () => console.log("Server running"));
