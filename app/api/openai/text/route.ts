import { NextResponse } from "next/server";
import { getOpenAIBandText } from "@app/api/openai/text/textConsts";
import { PrismaClient } from "@prisma/client";
import { getTextStats, isYearOdd } from "@/helpers/textStats/textStatsConsts";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req: Request) {
  const { name, band, year } = await req.json();

  const prisma = new PrismaClient();

  if (!name || !band || !year) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  return getOpenAIBandText(name, band, parseInt(year))
    .then((response) => {
      if (!response) {
        return NextResponse.json(
          { success: false, error: "Server Error" },
          { status: 500 },
        );
      }

      prisma.requestLog
        .create({
          data: { name, band, year: parseInt(year), content: response },
        })
        .catch((err) => console.error("💥 Prisma Save Error:", err));

      return NextResponse.json({
        success: true,
        text: response,
        stats: {
          ...getTextStats(response),
          isYearOdd: isYearOdd(parseInt(year)),
        },
      });
    })
    .catch((error: Error) => {
      return NextResponse.json(
        { success: false, error: "Server Error" },
        { status: 500 },
      );
    });
}
