import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

const getOpenAIBandImage = async (band: string, year: number) => {
  const prompt = `
    A realistic or artistic scene depicting the music band ${band} during the year ${year}  . 
    The image should reflect the cultural and visual style of that era, including clothing, stage design, instruments, and atmosphere. 
    Capture the mood of their performances or public appearances during that time. 
    Use colors and lighting typical of ${year}'s visual aesthetic.
    `;

  return openai.images
    .generate({
      model: "dall-e-3",
      prompt,
      response_format: "b64_json",
      size: "1024x1024",
    })
    .then((result) => {
      const imageData = result?.data?.[0]?.b64_json;

      if (!imageData) {
        throw new Error("Image generation failed.");
      }

      return imageData;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.error.message);
    });
};

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req: Request) {
  const { band, year } = await req.json();
  return getOpenAIBandImage(band, parseInt(year))
    .then((imageData) => {
      const buffer = Buffer.from(imageData, "base64");

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Content-Length": buffer.length.toString(),
        },
      });
    })
    .catch((error: Error) => {
      return NextResponse.json({ success: false, error });
    });
}
