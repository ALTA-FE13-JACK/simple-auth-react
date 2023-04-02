import { Component } from "react";

import Layout from "@/components/Layout";
import { UserType } from "@/utils/types/user";

interface PropsType {}

interface StateType {
  data: Partial<UserType>;
}

export class Profile extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount(): void {
    this.fecthData();
  }

  fecthData() {
    const temp = {
      id: 1,
      first_name: "First",
      last_name: "Last",
      username: "testing",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    };
    this.setState({ data: temp });
  }

  render() {
    const { image, username, first_name, last_name } = this.state.data;
    return (
      <Layout>
        <div className="flex flex-col items-center gap-3">
          <img
            src={image}
            alt={` ${username}'s picture`}
            className="rounded-full w-48 aspect-square"
          />
          <p className="font-bold ">
            {first_name} {last_name}
          </p>
          <p>{username}</p>
        </div>
      </Layout>
    );
  }
}

export default Profile;
