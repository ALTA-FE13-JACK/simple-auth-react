import { Component } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";

export class Register extends Component {
  render() {
    return (
      <Layout>
        <form className="flex flex-col items-center gap-4 w-[40%] ">
          <h1 className="font-bold -30">SIGN UP</h1>
          <div className="flex gap-4 w-[100%]">
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
          </div>
          <Input placeholder="Username" />
          <Input placeholder="Password" type="password" />
          <Button label="Register" />
        </form>
      </Layout>
    );
  }
}

export default Register;
