import { Component } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";

export class Register extends Component {
  render() {
    return (
      <Layout>
        <form className="flex flex-col items-center item gap-2 min-w-96 ">
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />

          <Input placeholder="Username" />
          <Input placeholder="Username" />

          <Input placeholder="Password" type="password" />
          <Button label="Register" />
        </form>
      </Layout>
    );
  }
}

export default Register;
