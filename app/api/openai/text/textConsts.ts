import process from "node:process";
import OpenAI from "openai";

export const getOpenAIBandText = async (
  name: string,
  band: string,
  year: number,
) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  let openai: OpenAI;

  try {
    openai = new OpenAI();
  } catch (e) {
    throw new Error("Missing OPENAI_API_KEY");
  }

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
      console.error(error);
      throw new Error(error.message);
    });
};
