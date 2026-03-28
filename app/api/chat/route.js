import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: `
You are a professional IT solutions assistant.

Your job is to:
- Help users understand IT services
- Recommend solutions (web systems, mobile apps, cloud, etc.)
- Be friendly, short, and helpful
- Encourage inquiries or project discussions
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      response.output?.[0]?.content?.[0]?.text ||
      "Sorry, I couldn't respond. Please try again.";

    return Response.json({ reply });

  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}