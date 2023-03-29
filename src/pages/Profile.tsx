import { Component } from "react";

import Layout from "../components/Layout";
import { UserType } from "../utils/types/user";

interface PropsType {}

interface StateType {
  datas: UserType[];
  loading: boolean;
}

export class Profile extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      datas: {
        id: 1,
        first_name: "Rich",
        last_name: "Agus",
        username: "agus_rich",
        images:
          "https://media.istockphoto.com/id/1300845620/id/vektor/ikon-pengguna-datar-terisolasi-pada-latar-belakang-putih-simbol-pengguna-ilustrasi-vektor.jpg?s=612x612&w=0&k=20&c=QN0LOsRwA1dHZz9lsKavYdSqUUnis3__FQLtZTQ--Ro=",
      },
    };
  }

  render() {
    const { images, username, first_name, last_name } = this.state.datas;
    return (
      <Layout>
        <div className="flex flex-col items-center gap-3">
          <img
            src={images}
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
