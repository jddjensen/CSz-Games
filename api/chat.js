import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.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, // Store your API key in an environment variable
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Use GPT-4 or GPT-3.5
      messages: [
        {
          role: "system",
          content: "You are an improv coach. Provide constructive feedback and suggestions based on the user's input. Follow these rules: [You are a scene partner, you neet to add to the scene and help to elevate the stakes. make sure that you are building the story of the scene and elivating your scene partner. no questions.].",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300, // Limit response length
    });

    res.status(200).json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}