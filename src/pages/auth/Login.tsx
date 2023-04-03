import { Component, FormEvent } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import withRouter, { NavigateParams } from "@/utils/navigation";

interface PropsType extends NavigateParams {}

interface StateType {
  username: string;
  password: string;
  loading: boolean;
}

export class Login extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: true,
    };
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post(`login`, body)
      .then((response) => {
        const { data } = response;
        alert(data.message);
        this.props.navigate("/");
      })
      .catch((error) => {
        alert(error.toSting());
      });
  }

  render() {
    return (
      <Layout>
        <form
          className="flex flex-col items-center gap-3"
          // onSubmit={this.handleSubmit}
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <h1 className="font-bold">Login</h1>
          <Input
            placeholder="Username"
            type="username"
            onChange={(event) =>
              this.setState({ username: event.target.value })
            }
          />

          <Input
            placeholder="Password"
            type="password"
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
          <p>
            Don't have account?{" "}
            <Link to="/register" className="font-bold">
              {" "}
              create acoount!
            </Link>
          </p>
          <Button
            label="Login"
            id="button-login"
            type="submit"
            disabled={this.state.username === "" || this.state.password === ""}
          />
        </form>
      </Layout>
    );
  }
}

export default withRouter(Login);
