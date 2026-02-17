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
          { role: "system", content: "Sen uzman bir kader matrisi ve numeroloji yorumcususun." },
          { role: "user", content: `Kişinin kader matrisi analizini Türkçe olarak yaz. 
Yorum 140–160 kelime arasında olsun. 
Metin akıcı, doğal ve düzgün Türkçe ile yazılmalı. 
Gereksiz tekrar, kalıp veya robotik ifadeler kullanılmamalı. 
Kişinin güçlü yönleri, yaşam amacı, duygusal yapısı ve gelecekteki potansiyeli üzerinde dur. 
Yorum mistik, derin ve kişiye özel hissi vermeli. 
Okuyucuda merak ve keşfetme isteği uyandırmalı. 
Bazı önemli sırların ve detayların henüz açığa çıkmadığı hissini ver.

Matris: ${JSON.stringify(matrix)}` }
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


