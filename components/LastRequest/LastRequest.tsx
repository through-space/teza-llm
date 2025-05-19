import { ILogData } from "@/types/common";
import { useEffect, useState } from "react";
import { updateLogs } from "./LastRequestConsts";

export const LastRequest = () => {
  const [lastBand, setLastBand] = useState<ILogData | null>(null);

  useEffect(() => {
    updateLogs((data) => setLastBand(data));
  }, []);

  if (!lastBand) return null;

  return (
    <div
      className={
        "flex items-start justify-center flex-col border rounded border-amber-700 p-4"
      }
    >
      <h2>Name:</h2>
      <>{lastBand.name}</>
      <h2>Band:</h2>
      <>{lastBand.band}</>
      <h2>Year:</h2>
      <>{lastBand.year}</>
      <h2>Content:</h2>
      <>{lastBand.content}</>
    </div>
  );
};
