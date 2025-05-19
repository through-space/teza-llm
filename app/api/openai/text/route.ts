import { NextResponse } from "next/server";
import {
  getOpenAIBandText,
  getTextStats,
} from "@app/api/openai/text/textConsts";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req: Request) {
  const { name, band, year } = await req.json();

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

      return NextResponse.json({
        success: true,
        text: response,
        stats: {
          ...getTextStats(response),
          isYearOdd: parseInt(year) % 2 === 1,
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
