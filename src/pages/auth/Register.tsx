import withReactContent from "sweetalert2-react-content";
import { FC, FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/Input";
import { useTitle } from "@/utils/hooks";

import Form from "@/components/Form";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import axios from "axios";
import Swal from "sweetalert2";

interface ObjSubmitType {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

const Register: FC = () => {
  const [objSubmit, setObjSubmit] = useState<ObjSubmitType>({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();
  useTitle("Register | User Management");

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
      .post(`register`, objSubmit)
      .then((response) => {
        const { data, message } = response.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
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
      .finally(() => setIsDisable(false));
  }

  return (
    <Layout>
      <Form>
        <form
          className="flex flex-col p-5 items-center gap-3 w-[70%]"
          onSubmit={(event) => handleSubmit(event)}
        >
          <h1 className="font-bold text-3xl text-black dark:text-white">
            SIGN UP
          </h1>

          <Input
            placeholder="First Name"
            id="input-first_name"
            type="first_name"
            onChange={(event) =>
              setObjSubmit({ ...objSubmit, first_name: event.target.value })
            }
          />
          <Input
            placeholder="Last Name"
            id="input-last_name"
            type="last_name"
            onChange={(event) =>
              setObjSubmit({ ...objSubmit, last_name: event.target.value })
            }
          />

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

          <p className="text-black dark:text-white">
            Already have an account? Login{" "}
            <Link to="/login" className="font-bold" id="nav-login">
              {" "}
              here!
            </Link>
          </p>
          <Button
            label="Register"
            id="button-register"
            type="submit"
            disabled={isDisable}
          />
        </form>
      </Form>
    </Layout>
  );
};

export default Register;
// export default withRouter(Register);
