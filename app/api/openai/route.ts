import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const prisma = new PrismaClient();

const testOpenAI = async () => {
  const client = new OpenAI();

  const response = await client.responses.create({
    model: "gpt-4.1",
    input: "Write a one-sentence bedtime story about a unicorn.",
  });

  console.log(response.output_text);

  return NextResponse.json({});
};

export async function GET() {
  // return testOpenAI();
  return NextResponse.json({});
}

export async function POST(req: Request) {
  const { name, band, year } = await req.json();
  // await prisma.person.create({ data: { name } });
  console.log(name, band, year);
  return NextResponse.json({ success: true });
}
