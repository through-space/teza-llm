import { ILogData } from "@/types/common";
import { ILogResponse } from "@/types/responseTypes";

export const updateLogs = async (setLastBand: (data: ILogData) => void) => {
  fetch("/api/logs")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching logs.");
      }

      return res.json();
    })
    .then((data: ILogResponse) => {
      if (!data.success) {
        return;
      }

      if (!data.logData) {
        return;
      }

      setLastBand(data.logData);
    })
    .catch(() => {});
};
