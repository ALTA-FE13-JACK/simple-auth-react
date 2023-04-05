import { FC, FormEvent, useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";

import Form from "@/components/Form";
import Image from "@/assets/react.svg";
import { Input } from "@/components/Input"; // named import
import Layout from "@/components/Layout";
import Button from "@/components/Button"; // import default
import { handleAuth } from "@/utils/redux/reducers/reducer";
import { useTitle } from "@/utils/hooks";
import Swal from "@/utils/swal";

interface ObjSubmitType {
  username: string;
  password: string;
}

const Login: FC = () => {
  const [objSubmit, setObjSubmit] = useState<ObjSubmitType>({
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const MySwal = withReactContent(Swal);
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  useTitle("Login | User Management");

  useEffect(() => {
    const isEmpty = Object.values(objSubmit).every((val) => {
      return val !== "";
    });
    setIsDisabled(!isEmpty);
  }, [objSubmit]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisabled(true);
    axios
      .post("login", objSubmit)
      .then((response) => {
        const { data, message } = response.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setCookie("tkn", data.token);
            setCookie("uname", data.username);
            // localStorage.setItem("tkn", data.token) // disimpan dengan nama tkn dan nilai harus string
            // localStorage.setItem("uname", data.username) // disimpan dengan nama uname dan nilai harus string
            navigate("/");
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => setIsDisabled(false));
  }

  return (
    <Layout>
      <Form>
        <form
          className="flex flex-col p-5 items-center gap-3"
          // onSubmit={this.handleSubmit}
          onSubmit={(event) => handleSubmit(event)}
        >
          <h1 className="font-bold text-3xl text-back dark:text-white">
            LOGIN
          </h1>
          <Input
            placeholder="Username"
            id="input-uname"
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
          <p className="text-black dark:text-white">
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
            disabled={isDisabled}
          />
        </form>
      </Form>
    </Layout>
  );
};

export default Login;
