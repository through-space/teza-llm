import { describe } from "@jest/globals";
import {
  getCapitalLetterWordCount,
  getWordsBeforeNumbersCount,
  isYearOdd,
} from "@/helpers/textStats/textStatsConsts";

describe("Testing Capital Letter Words", () => {
  test("Empty Text", () => {
    expect(getCapitalLetterWordCount("")).toBe(0);
  });
  test("Different Words", () => {
    const text = "a A ab Ab aBa aaB";
    expect(getCapitalLetterWordCount(text)).toBe(2);
  });
});

describe("Testing Words Before Numbers", () => {
  test("Empty Text", () => {
    expect(getWordsBeforeNumbersCount("")).toBe(0);
  });

  test("Different Words", () => {
    const text = "a A1 A 1 A 123 123 A abc a a 12,3. 123 abc";
    expect(getWordsBeforeNumbersCount(text)).toBe(3);
  });
});

describe("Testing Odd Year", () => {
  test("Odd Year", () => {
    expect(isYearOdd(2001)).toBe(true);
  });

  test("Even Year", () => {
    expect(isYearOdd(2000)).toBe(false);
  });

  test("Negative Even Year", () => {
    expect(isYearOdd(-2000)).toBe(false);
  });
});
