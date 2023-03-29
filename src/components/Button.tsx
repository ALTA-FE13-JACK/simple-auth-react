import { Component, ButtonHTMLAttributes } from "react";

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

class Button extends Component<props> {
  render() {
    return (
      <button
        className="bg-sky-900 text-white font-bold py-2 px-4 rounded-full border-white"
        {...this.props}
      >
        {this.props.label}
      </button>
    );
  }
}

export default Button;
