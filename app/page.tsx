"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { FormFieldsWrapper } from "@components/FormFieldsWrapper/FormFieldsWrapper";

export default function Home() {
  const [name, setName] = useState("");
  const [band, setBand] = useState("");
  const [year, setYear] = useState("");

  const [isTextLoading, setIsTextLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [textResponse, setTextResponse] = useState("");
  const [imageResponse, setImageResponse] = useState("");

  const [people, setPeople] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = JSON.stringify({ name, band, year });
    setIsTextLoading(true);
    setIsImageLoading(true);

    await fetch("/api/openai/text", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTextResponse(data.response);
        setIsTextLoading(false);
      })
      .catch((err) => {
        setIsTextLoading(false);
        setTextResponse(err.response);
      });

    await fetch("/api/openai/image", {
      method: "POST",
      headers: { "Content-Type": "image/png" },
      body: formData,
    })
      .then((data) => data.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setImageResponse(imageUrl);
        setIsImageLoading(false);
      });
  };

  const startYear = 1960;
  const endYear = 2025;
  const defaultYear = endYear;
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
    <main style={{ padding: 20 }}>
      <h1>Get Band</h1>
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
            onChange={(e) => setYear(e.target.value)}
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
    </main>
  );
}
