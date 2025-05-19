import * as React from "react";
import { IFormData } from "@/types/requestTypes";

export interface IBandFormProps {
  onSubmit: (props: IFormData) => void;
  setError: (error: string) => void;
}
