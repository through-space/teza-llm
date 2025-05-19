"use client";
import * as React from "react";
import { useState } from "react";
import { FormFieldsWrapper } from "@components/FormFieldsWrapper/FormFieldsWrapper";
import {
  defaultYear,
  endYear,
  fetchText,
  startYear,
} from "@app/(home)/homeConsts";
import { ITextStats } from "@app/api/openai/text/textInterfaces";

export default function Home() {
  const [name, setName] = useState("");
  const [band, setBand] = useState("");
  const [year, setYear] = useState(defaultYear);

  const [isTextLoading, setIsTextLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [textResponse, setTextResponse] = useState("");
  const [imageResponse, setImageResponse] = useState("");
  const [error, setError] = useState("");

  const [people, setPeople] = useState<string[]>([]);

  const [responseStats, setResponseStats] = useState<ITextStats>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !band || !year) {
      setError("Please fill all fields");
      return;
    }

    const formData = JSON.stringify({ name, band, year });
    setIsTextLoading(true);
    setIsImageLoading(true);

    fetchText(formData)
      .then((data) => {
        if (data.success) {
          setTextResponse(data?.text ?? "");
          setResponseStats(data?.stats ?? {});

          setError("");
        } else {
          setError(data?.error ?? "");
        }
      })
      .catch((err) => {
        setError(err.response);
      })
      .finally(() => {
        setIsTextLoading(false);
      });

    // fetchImage(formData)
    //   .then((imageUrl) => {
    //     setImageResponse(imageUrl);
    //     setIsImageLoading(false);
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //   })
    //   .finally(() => {
    //     setIsTextLoading(false);
    //   });
  };

  const yearOptions = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i,
  ).map((year) => (
    <option value={year} key={year}>
      {year}
    </option>
  ));

  const responseImage = imageResponse ? <img src={imageResponse} /> : null;

  return (
    <main style={{ padding: 20 }} className={"flex flex-col justify-center"}>
      <h1>Get Band</h1>
      <div>{error}</div>
      <form onSubmit={handleSubmit}>
        <FormFieldsWrapper>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <textarea
            placeholder="Your favorite music band + a few words explaining why you chose them"
            onChange={(e) => setBand(e.target.value)}
            value={band}
          ></textarea>
          <select
            onChange={(e) => setYear(parseInt(e.target.value))}
            defaultValue={defaultYear}
          >
            {...yearOptions}
          </select>

          <button type="submit">Submit</button>
        </FormFieldsWrapper>
      </form>
      <ul>
        {people.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      <div>{isTextLoading ? "Loading..." : textResponse}</div>
      <div>{isImageLoading ? "Loading..." : responseImage}</div>
      {!isTextLoading && Object.keys(responseStats).length > 0 && (
        <ul className={"flex flex-col justify-center"}>
          <li>
            Words That Start with a Capital Letter:{" "}
            {responseStats.capitalLetterWords ?? 0}
          </li>
          <li>
            Words Followed by Numbers: {responseStats.wordsBeforeNumbers ?? 0}
          </li>
          <li>The Year is {responseStats.isYearOdd ? "Odd" : "Even"}</li>
        </ul>
      )}
    </main>
  );
}
