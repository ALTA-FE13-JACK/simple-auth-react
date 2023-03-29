import React, {
  Component,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export class Input extends Component<InputHTMLAttributes<HTMLInputElement>> {
  render() {
    return (
      <input
        className="boarder rounded-md bg-slate-100 text-black p-2 focus:outline-none focus:boarder-sky-500 focus:ring-2"
        {...this.props}
      />
    );
  }
}
export class textArea extends Component<InputHTMLAttributes<HTMLInputElement>> {
  render() {
    return (
      <input
        className="boarder rounded-md bg-slate-100 text-black p-2 focus:outline-none focus:boarder-sky-500 focus:ring-2"
        {...this.props}
      />
    );
  }
}

export default Input;
