import { FC, FormEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserEdit } from "@/utils/types/user";
import { useTitle } from "@/utils/hooks";

import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import withRouter, { NavigateParams } from "@/utils/navigation";

const Profile: FC = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<UserEdit>>({});
  const [image, setImage] = useState<string>("");
  const [data, setData] = useState<Partial<UserEdit>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const params = useParams();
  useTitle("Profile | User Management");

  useEffect(() => {
    fecthData();
  }, []);

  function fecthData() {
    const { username } = params;
    axios
      .get(`users/${username}`)
      .then((response) => {
        const { data } = response.data;
        // document.title = `Profile ${username} | User Management`;
        setData(data);
        setImage(data.image);
      })
      .catch((error) => {
        alert(error.toSting());
      })
      .finally(() => setLoading(false));
  }

  function handleChange(value: string | File, key: keyof typeof objSubmit) {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    axios
      .put(`users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data } = response;
        setIsEdit(false);
        console.log(data);
      })
      .catch((error) => {
        alert(error.toSting());
      })
      .finally(() => fecthData());
  }

  const handleEditMode = () => {
    setIsEdit(isEdit);
  };

  const { username, first_name, last_name, password } = data;
  return (
    <Layout>
      <div className="flex flex-col items-center gap-3 mb-3">
        <img
          src={image}
          alt={` ${username}'s picture`}
          className="rounded-full w-48 aspect-square"
        />
        {isEdit ? (
          <form
            className="flex flex-col items-center gap-3"
            onSubmit={(event) => handleSubmit(event)}
          >
            <Input
              placeholder="Select Image"
              type="file"
              onChange={(event) => {
                if (!event.currentTarget.files) {
                  return;
                }
                setImage(URL.createObjectURL(event.currentTarget.files[0]));

                handleChange(event.currentTarget.files[0], "image");
              }}
            />
            <Input
              placeholder="First Name"
              defaultValue={first_name}
              onChange={(event) =>
                handleChange(event.target.value, "first_name")
              }
            />
            <Input
              placeholder="Last Name"
              defaultValue={last_name}
              onChange={(event) =>
                handleChange(event.target.value, "last_name")
              }
            />
            <Input
              placeholder="Username"
              defaultValue={username}
              onChange={(event) => handleChange(event.target.value, "username")}
            />
            <Input
              placeholder="Password"
              defaultValue={password}
              onChange={(event) => handleChange(event.target.value, "password")}
            />
            <Button
              label="Submit"
              id="button-submit"
              type="submit"
              // disabled={
              //   first_name === "" ||
              //   last_name === "" ||
              //   username === "" ||
              //   password === ""
              // }
            />
          </form>
        ) : (
          <div>
            <p className="font-bold ">
              {first_name} {last_name}
            </p>
            <p>{username}</p>
          </div>
        )}
      </div>
      <Button label="Edit Profile" id="button-edit" onClick={handleEditMode} />
    </Layout>
  );
};

export default withRouter(Profile);
