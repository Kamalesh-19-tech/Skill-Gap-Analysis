import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate-question', async (req, res) => {
  try {
    const { topic } = req.body;
    const prompt = `Generate a single quiz question about ${topic}.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const question = result.response.text().trim();

    res.json({ question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));

/*
GEMINI_API_KEY=AIzaSyBxVq7CkcxpiOm5Uwl2xzVxlseIGloRSuM
*/
