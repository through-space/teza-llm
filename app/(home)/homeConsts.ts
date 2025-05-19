import { ITextStats } from "@app/api/openai/text/textInterfaces";

export const fetchImage = async (formData: string) => {
  return fetch("/api/openai/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: formData,
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json().catch(() => {});
        throw new Error(errorData.error || "Failed to fetch image.");
      }
      return res.blob();
    })
    .then((blob) => URL.createObjectURL(blob));
};

export const fetchText = async (
  formData: string,
): Promise<{
  success: boolean;
  text?: string;
  stats?: ITextStats;
  error?: string;
}> => {
  return fetch("/api/openai/text", {
    method: "POST",
    body: formData,
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (!res.ok) {
      const errorData = await res.json().catch(() => {});
      throw new Error(errorData.error || "Failed to fetch text.");
    }

    return res.json();
  });
};

export const startYear = 1960;
export const endYear = 2025;
export const defaultYear = endYear;
