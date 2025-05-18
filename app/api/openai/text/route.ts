import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

const getOpenAIBandText = async (name: string, band: string, year: number) => {
  const prompt = `
      A user named "${name}" selected a band and a year.

      Based on this input: "${band}", and the year "${year}", 
      write exactly two engaging and informative paragraphs describing significant 
      events or milestones for the band in that year.

      Do NOT mention the user's name or input directly — just generate the historical content.
    `;

  return openai.chat.completions
    .create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })
    .then((response) => response.choices[0].message.content)
    .catch((error) => {
      throw new Error(error.message);
    });
};

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req: Request) {
  const { name, band, year } = await req.json();

  return getOpenAIBandText(name, band, parseInt(year))
    .then((response) => {
      return NextResponse.json({ success: true, response });
    })
    .catch((error: Error) => {
      return NextResponse.json({ success: false, error });
    });
}
