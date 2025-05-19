import { ITextStats } from "@/types/common";
import * as React from "react";

export const ResponseStats = (props: { responseStats: ITextStats }) => {
  const { responseStats } = props;

  if (!responseStats) {
    return null;
  }

  return (
    <ul
      className={
        "flex flex-col justify-center border rounded border-amber-700 p-4"
      }
    >
      <li>
        Words That Start with a Capital Letter:{" "}
        {responseStats.capitalLetterWords ?? 0}
      </li>
      <li>
        Words Followed by Numbers: {responseStats.wordsBeforeNumbers ?? 0}
      </li>
      <li>The Year is {responseStats.isYearOdd ? "Odd" : "Even"}</li>
    </ul>
  );
};
