import { ITextStats } from "@/types/common";

export const getCapitalLetterWordCount = (text: string): number => {
  const pattern = /\s[A-Z]\w?/g;
  return text.match(pattern)?.length ?? 0;
};

export const getWordsBeforeNumbersCount = (text: string): number => {
  const pattern = /[^\\.\s\d]+[ ,]\d/gi;
  return text.match(pattern)?.length ?? 0;
};

export const isYearOdd = (year: number): boolean => {
  return year % 2 === 1;
};

export const getTextStats = (text: string): ITextStats => {
  return {
    capitalLetterWords: getCapitalLetterWordCount(text),
    wordsBeforeNumbers: getWordsBeforeNumbersCount(text),
  };
};
