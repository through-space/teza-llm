"use client";
import * as React from "react";
import { useState } from "react";
import { updateImage, updateText } from "@app/(home)/homeConsts";
import { ITextStats } from "@/types/common";
import { ResponseStats } from "@components/ResponseStats/ResponseStats";
import { BandForm } from "@components/BandForm/BandForm";
import { IFormData } from "@/types/requestTypes";
import { LastRequest } from "@/components/LastRequest/LastRequest";

export default function Home() {
  const [isTextLoading, setIsTextLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [textResponse, setTextResponse] = useState("");
  const [imageResponse, setImageResponse] = useState("");
  const [error, setError] = useState("");

  const [people, setPeople] = useState<string[]>([]);

  const [responseStats, setResponseStats] = useState<ITextStats>({});

  const handleSubmit = async (formData: IFormData) => {
    setIsTextLoading(true);
    setIsImageLoading(true);

    updateText({
      formData,
      setIsLoading: setIsTextLoading,
      setError,
      setData: (data) => {
        setTextResponse(data?.text ?? "");
        setResponseStats(data?.stats ?? {});
      },
    });

    updateImage({
      formData,
      setIsLoading: setIsImageLoading,
      setError,
      setData: setImageResponse,
    });
  };

  const imageComponent = imageResponse ? <img src={imageResponse} /> : null;

  return (
    <main
      style={{ padding: 20 }}
      className={"flex flex-col justify-center w-2/3 gap-3"}
    >
      <h1>Get Band</h1>
      <div>{error}</div>
      <div className=" border rounded border-amber-700 p-4">
        <BandForm onSubmit={handleSubmit} setError={setError} />
      </div>

      {(isTextLoading || textResponse) && (
        <div className=" border rounded border-amber-700 p-4">
          {isTextLoading ? "Loading..." : textResponse}
        </div>
      )}
      {(isImageLoading || imageComponent) && (
        <div className=" border rounded border-amber-700 p-4">
          {isImageLoading ? "Loading..." : imageComponent}
        </div>
      )}
      {!isTextLoading && textResponse && (
        <ResponseStats responseStats={responseStats} />
      )}
      <LastRequest />
    </main>
  );
}
