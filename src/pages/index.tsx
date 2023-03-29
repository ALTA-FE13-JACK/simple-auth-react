import { Component } from "react";
import Card from "../components/Card";

import Layout from "../components/Layout";
import { UserType } from "../utils/types/user";

interface PropsType {}

interface StateType {
  datas: UserType[];
  loading: boolean;
}

class home extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      datas: [],
      loading: true,
    };
  }

  componentDidMount(): void {
    this.fetchData();
    this.fetchProfile();
  }

  fetchProfile() {
    console.log(this.state.loading);
  }

  fetchData() {
    let temp: UserType[] = [];
    for (let i = 1; i <= 12; i++) {
      const obj = {
        id: i,
        first_name: "Rich",
        last_name: "Agus",
        username: `agus_rich${i}`,
        images:
          "https://media.istockphoto.com/id/1300845620/id/vektor/ikon-pengguna-datar-terisolasi-pada-latar-belakang-putih-simbol-pengguna-ilustrasi-vektor.jpg?s=612x612&w=0&k=20&c=QN0LOsRwA1dHZz9lsKavYdSqUUnis3__FQLtZTQ--Ro=",
      };
      temp.push(obj);
    }
    setTimeout(() => {
      this.setState({
        datas: temp,
        loading: false,
      });
    }, 300);
  }

  render() {
    return (
      <Layout>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {this.state.datas.map((data) => (
            <Card
              key={data.id}
              fisrt_name={data.first_name}
              last_name={data.last_name}
              username={data.username}
              images={data.images}
            />
          ))}
        </div>
      </Layout>
    );
  }
}
export default home;
