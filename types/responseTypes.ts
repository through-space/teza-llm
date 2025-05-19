import { ILogData, ITextStats } from "@/types/common";

export interface ITextResponse {
  success: boolean;
  text?: string;
  stats?: ITextStats;
  error?: string;
}

export interface ILogResponse {
  success: boolean;
  message?: string;
  logData?: ILogData;
}
