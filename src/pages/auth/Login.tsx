// import withRouter, { NavigateParams } from "@/utils/navigation";
import { FC, FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/Input";
import { useTitle } from "@/utils/hooks";

import Layout from "@/components/Layout";
import Button from "@/components/Button";
import axios from "axios";

interface ObjSubmitType {
  username: string;
  password: string;
}

const Login: FC = () => {
  const [objSubmit, setObjSubmit] = useState<ObjSubmitType>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  useTitle("Login | User Management");

  useEffect(() => {
    const isEmpty = Object.values(objSubmit).every((val) => {
      return val !== "";
    });
    setIsDisable(!isEmpty);
  }, [objSubmit]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisable(true);
    axios
      .post(`login`, objSubmit)
      .then((response) => {
        const { data } = response;
        alert(data.message);
        navigate("/");
      })
      .catch((error) => {
        alert(error.toSting());
      })
      .finally(() => setIsDisable(false));
  }

  return (
    <Layout>
      <form
        className="flex flex-col items-center gap-3"
        // onSubmit={this.handleSubmit}
        onSubmit={(event) => handleSubmit(event)}
      >
        <h1 className="font-bold text-3xl">Login</h1>
        <Input
          placeholder="Username"
          id="input-username"
          type="username"
          onChange={(event) =>
            setObjSubmit({ ...objSubmit, username: event.target.value })
          }
        />

        <Input
          placeholder="Password"
          id="input-password"
          type="password"
          onChange={(event) =>
            setObjSubmit({ ...objSubmit, password: event.target.value })
          }
        />
        <p>
          Don't have account?{" "}
          <Link to="/register" className="font-bold" id="nav-register ">
            {" "}
            create acoount!
          </Link>
        </p>
        <Button
          label="Login"
          id="button-login"
          type="submit"
          disabled={isDisable}
        />
      </form>
    </Layout>
  );
};

export default Login;
// export default withRouter(Login);
