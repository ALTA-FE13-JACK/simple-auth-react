import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <div className="w-Full h-screen overflow-auto flex flex-col  bg-gradient-to-r from-cyan-100 to-cyan-800 dark:from-cyan-800 dark:to-cyan-900">
      <Navbar />
      <div className="h-full p-3 flex flex-col items-center">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
