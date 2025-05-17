import { FC, ReactNode } from "react";

export const FormFieldsWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <div className={"flex flex-col w-full p-16 gap-3"}>{children}</div>;
};
