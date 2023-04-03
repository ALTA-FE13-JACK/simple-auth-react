import { Component } from "react";
import axios from "axios";
import Card from "@/components/Card";

import Layout from "@/components/Layout";
import { UserType } from "@/utils/types/user";

interface PropsType {}

interface StateType {
  data: UserType[];
  loading: boolean;
}

class home extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount(): void {
    this.fetchData();
    // this.fetchAlternative();
  }
  fetchData() {
    axios
      .get("users")
      .then((response) => {
        const { data } = response.data;
        this.setState({ data: data });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }

  fetchAlternative() {
    fetch(
      "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0/users"
    )
      .then((result) => result.json())
      .then((response) => {
        const { data } = response.data;
        this.setState({ data: data });
        console.log(response.data.data);
      });
  }

  render() {
    return (
      <Layout>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {this.state.data.map((data) => (
            <Card
              key={data.id}
              fisrt_name={data.first_name}
              last_name={data.last_name}
              username={data.username}
              image={data.image}
            />
          ))}
        </div>
      </Layout>
    );
  }
}
export default home;
