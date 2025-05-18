import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const prisma = new PrismaClient();
const openai = new OpenAI();

const getOpenAIBandText = async (name: string, band: string, year: number) => {
  try {
    const prompt = `
      A user named "${name}" selected a band and a year.

      Based on this input: "${band}", and the year "${year}", 
      write exactly two engaging and informative paragraphs describing significant 
      events or milestones for the band in that year.

      Do NOT mention the user's name or input directly — just generate the historical content.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 },
    );
  }
};

export async function GET() {
  // return testOpenAI();
  return NextResponse.json({});
}

export async function POST(req: Request) {
  const { name, band, year } = await req.json();
  console.log(`${name}: ${band}, year: ${year}`);
  const response = await getOpenAIBandText(name, band, parseInt(year));

  return NextResponse.json({ success: true, response });
}
