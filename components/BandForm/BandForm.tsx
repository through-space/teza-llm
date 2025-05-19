import { FC, ReactNode, useState } from "react";
import { IBandFormProps } from "@components/BandForm/BandFormInterfaces";
import { FormFieldsWrapper } from "@components/FormFieldsWrapper/FormFieldsWrapper";
import { defaultYear, endYear, startYear } from "@app/(home)/homeConsts";
import * as React from "react";

export const BandForm: FC<IBandFormProps> = ({ onSubmit, setError }) => {
  const [name, setName] = useState("");
  const [band, setBand] = useState("");
  const [year, setYear] = useState(defaultYear);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !band || !year) {
      setError("Please fill all fields");
      return;
    }

    onSubmit({ name, year, band });
  };

  const yearOptions = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i,
  ).map((year) => (
    <option value={year} key={year}>
      {year}
    </option>
  ));

  return (
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
  );
};
