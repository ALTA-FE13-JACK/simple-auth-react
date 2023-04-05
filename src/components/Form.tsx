import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Form: FC<Props> = (props) => {
  return (
    <div className="flex  m-5 justify-center items-center bg-slate-300 dark:bg-slate-800 dark:bg-opacity-50 rounded-2xl">
      {props.children}
    </div>
  );
};

export default Form;
