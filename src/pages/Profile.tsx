import { Component, FormEvent } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import { UserEdit } from "@/utils/types/user";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface PropsType {}

interface StateType {
  data: Partial<UserEdit>;
  laoding: boolean;
  isEdit: boolean;
  image: string;
  objSubmit: Partial<UserEdit>;
}

export class Profile extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      objSubmit: {},
      image: "",
      data: {},
      laoding: true,
      isEdit: false,
    };
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    let key: keyof typeof this.state.objSubmit;
    for (key in this.state.objSubmit) {
      formData.append(key, this.state.objSubmit[key]);
    }
    axios
      .put(`users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        this.setState({ isEdit: false });
      })
      .catch((error) => {
        alert(error.toSting());
      })
      .finally(() => this.fecthData());
  }

  componentDidMount(): void {
    this.fecthData();
  }

  fecthData() {
    axios
      .get("users/testing")
      .then((response) => {
        const { data } = response.data;
        this.setState({ data: data, image: data.image });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }

  handleChange(value: string | File, key: keyof typeof this.state.objSubmit) {
    let temp = { ...this.state.objSubmit };
    temp[key] = value;
    this.setState({ objSubmit: temp });
  }

  render() {
    const { username, first_name, last_name, password } = this.state.data;
    return (
      <Layout>
        <div className="flex flex-col items-center gap-3 mb-3">
          <img
            src={this.state.image}
            alt={` ${username}'s picture`}
            className="rounded-full w-48 aspect-square"
          />
          {this.state.isEdit ? (
            <form
              className="flex flex-col items-center gap-3"
              onSubmit={(event) => this.handleSubmit(event)}
            >
              <Input
                placeholder="Select Image"
                type="file"
                onChange={(event) => {
                  if (!event.currentTarget.files) {
                    return;
                  }
                  this.setState({
                    image: URL.createObjectURL(event.currentTarget.files[0]),
                  });
                  this.handleChange(event.currentTarget.files[0], "image");
                }}
              />
              <Input
                placeholder="First Name"
                defaultValue={first_name}
                onChange={(event) =>
                  this.handleChange(event.target.value, "first_name")
                }
              />
              <Input
                placeholder="Last Name"
                defaultValue={last_name}
                onChange={(event) =>
                  this.handleChange(event.target.value, "last_name")
                }
              />
              <Input
                placeholder="Username"
                defaultValue={username}
                onChange={(event) =>
                  this.handleChange(event.target.value, "username")
                }
              />
              <Input
                placeholder="Password"
                defaultValue={password}
                onChange={(event) =>
                  this.handleChange(event.target.value, "password")
                }
              />
              <Button
                label="Submit"
                id="button-submit"
                type="submit"
                // disabled={
                //   this.state.first_name === "" ||
                //   this.state.last_name === "" ||
                //   this.state.username === "" ||
                //   this.state.password === ""
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
        <Button
          label="Edit Profile"
          id="button-edit"
          onClick={() => this.setState({ isEdit: true })}
        />
      </Layout>
    );
  }
}

export default Profile;
