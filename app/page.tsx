"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { FormFieldsWrapper } from "@components/FormFieldsWrapper/FormFieldsWrapper";

export default function Home() {
  const [name, setName] = useState("");
  const [band, setBand] = useState("");
  const [year, setYear] = useState("");

  const [response, setResponse] = useState("");

  const [people, setPeople] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/submit")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => setPeople(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // await fetch("/api/submit", {
    //   method: "POST",
    //   body: JSON.stringify({ name }),
    //   headers: { "Content-Type": "application/json" },
    // });
    // setName("");
    // const updated = await fetch("/api/submit").then((res) => res.json());
    // setPeople(updated);
    await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({ name, band, year }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.response);
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

  return (
    <main style={{ padding: 20 }}>
      <h1>Hello2</h1>
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

      <div>{response}</div>
    </main>
  );
}
