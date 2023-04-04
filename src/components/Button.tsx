import { FC, ButtonHTMLAttributes } from "react";

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const Button: FC<props> = (props) => {
  return (
    <button
      className="bg-sky-900 text-white font-bold py-2 px-4 rounded-full border-white disabled:bg-gray-600"
      {...props}
    >
      {props.label}
    </button>
  );
};

export default Button;
