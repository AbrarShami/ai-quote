import { NextResponse } from "next/server";
import OpenAI from "openai";



export async function POST(req) {
  try {
    const { tone } = await req.json();

    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    if (!client) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 400 }
      );
    }

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You generate short quotes." },
          { role: "user", content: `Give me one two line ${tone} quote. change each time` },
        ],
    });

    return NextResponse.json({
      quote: response.choices[0].message.content.trim(),
    });
  } catch (error) {
    console.error("OpenAI error:", error);

    return NextResponse.json(
      { error: "Failed to generate quote" },
      { status: 500 }
    );
  }
}
