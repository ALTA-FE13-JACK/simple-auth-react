import { Component, FormEvent } from "react";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import withRouter, { NavigateParams } from "@/utils/navigation";

interface PropsType extends NavigateParams {}

interface StateType {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  loading: boolean;
}

export class Register extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      loading: true,
    };
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post(`register`, body)
      .then((response) => {
        const { data } = response;
        alert(data.message);
        this.props.navigate("/login");
      })
      .catch((error) => {
        alert(error.toSting());
      });
  }

  render() {
    return (
      <Layout>
        <form
          className="flex flex-col items-center gap-4 w-[40%] "
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <h1 className="font-bold -30">SIGN UP</h1>
          <div className="flex gap-4 w-[100%]">
            <Input
              placeholder="First Name"
              type="first_name"
              onChange={(event) =>
                this.setState({ first_name: event.target.value })
              }
            />
            <Input
              placeholder="Last Name"
              type="last_name"
              onChange={(event) =>
                this.setState({ last_name: event.target.value })
              }
            />
          </div>
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
            Already have an account? Login{" "}
            <Link to="/login" className="font-bold">
              {" "}
              here!
            </Link>
          </p>
          <Button
            label="Register"
            id="button-register"
            type="submit"
            disabled={
              this.state.first_name === "" ||
              this.state.last_name === "" ||
              this.state.username === "" ||
              this.state.password === ""
            }
          />
        </form>
      </Layout>
    );
  }
}

export default withRouter(Register);
