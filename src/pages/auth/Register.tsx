import withRouter, { NavigateParams } from "@/utils/navigation";
import { FC, FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/Input";

import Layout from "@/components/Layout";
import Button from "@/components/Button";
import axios from "axios";

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
  const navigate = useNavigate();

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
        const { data } = response;
        alert(data.message);
        navigate("/login");
      })
      .catch((error) => {
        alert(error.toSting());
      })
      .finally(() => setIsDisable(false));
  }

  return (
    <Layout>
      <form
        className="flex flex-col items-center gap-4 w-[40%] "
        onSubmit={(event) => handleSubmit(event)}
      >
        <h1 className="font-bold -30">SIGN UP</h1>
        <div className="flex gap-4 w-[100%]">
          <Input
            placeholder="First Name"
            type="first_name"
            onChange={(event) =>
              setObjSubmit({ ...objSubmit, first_name: event.target.value })
            }
          />
          <Input
            placeholder="Last Name"
            type="last_name"
            onChange={(event) =>
              setObjSubmit({ ...objSubmit, last_name: event.target.value })
            }
          />
        </div>
        <Input
          placeholder="Username"
          type="username"
          onChange={(event) =>
            setObjSubmit({ ...objSubmit, username: event.target.value })
          }
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(event) =>
            setObjSubmit({ ...objSubmit, password: event.target.value })
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
          disabled={isDisable}
        />
      </form>
    </Layout>
  );
};
export default withRouter(Register);
