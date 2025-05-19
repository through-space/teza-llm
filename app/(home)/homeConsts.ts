import { IFormData } from "@/types/requestTypes";
import { ITextResponse } from "@/types/responseTypes";
import { ILogData, ITextStats } from "@/types/common";

export const fetchImage = async (formData: IFormData): Promise<string> => {
  return fetch("/api/openai/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
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
  formData: IFormData,
): Promise<ITextResponse> => {
  return fetch("/api/openai/text", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (!res.ok) {
      const errorData = await res.json().catch(() => {});
      throw new Error(errorData.error || "Failed to fetch text.");
    }

    return res.json();
  });
};

export const updateText: (params: {
  formData: IFormData;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  setData: (data: ITextResponse) => void;
}) => void = ({ formData, setData, setError, setIsLoading }) => {
  fetchText(formData)
    .then((data) => {
      if (data.success) {
        setData(data);

        setError("");
      } else {
        setError(data?.error ?? "");
      }
    })
    .catch((err) => {
      setError(err.response);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const updateImage: (params: {
  formData: IFormData;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  setData: (data: string) => void;
}) => void = ({ formData, setData, setError, setIsLoading }) => {
  fetchImage(formData)
    .then((imageUrl) => {
      setData(imageUrl);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const startYear = 1960;
export const endYear = 2025;
export const defaultYear = endYear;
