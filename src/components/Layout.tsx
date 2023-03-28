import { Component, ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export class Layout extends Component<Props> {
  render() {
    return (
      <div className="w-Full h-screen overflow-auto flex flex-col">
        <Navbar />
        <div className="h-full p-3">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
