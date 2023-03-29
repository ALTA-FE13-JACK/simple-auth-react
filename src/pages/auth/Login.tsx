import { Component } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";

export class Login extends Component {
  render() {
    return (
      <Layout>
        <form className="flex flex-col items-center gap-3">
          <Input placeholder="Username" />
          <Input placeholder="Password" type="password" />
          <Button label="login" />
        </form>
      </Layout>
    );
  }
}

export default Login;
