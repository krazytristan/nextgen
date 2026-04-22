import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-5.3",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant for an IT solutions company. Be helpful, professional, and concise.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return Response.json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    return Response.json({ reply: "⚠️ AI error." }, { status: 500 });
  }
}