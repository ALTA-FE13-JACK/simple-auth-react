import React, { FC, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { placeholder } = props;
  return (
    <div>
      <label className="text-black p-1 tracking-wide  w-full">
        {placeholder}
      </label>
      <input
        className="boarder rounded-md bg-slate-100 text-black p-2 focus:outline-none focus:boarder-sky-500 focus:ring-2 w-full"
        {...props}
      />
    </div>
  );
};
export const textArea: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      className="boarder rounded-md bg-slate-100 text-black p-2 focus:outline-none focus:boarder-sky-500 focus:ring-2 w-full"
      {...props}
    />
  );
};

export default Input;
