import { useTitle, useFetchGet } from "@/utils/hooks";
import { FC, useState, useEffect } from "react";
import { Spinner } from "@/components/Loading";
import { UserType } from "@/utils/types/user";

import Layout from "@/components/Layout";
import Card from "@/components/Card";
import axios from "axios";

const Home: FC = () => {
  const [datas, setDatas] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [data] = useFetchGet(
    "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0/users/users"
  );
  useTitle("Homepage | User Management");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("users")
      .then((response) => {
        const { data } = response.data;
        setDatas(data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        // console.log(error);
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  function fetchAlternative() {
    fetch(
      "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0/users"
    )
      .then((result) => result.json())
      .then((response) => {
        const { data } = response.data;
        setDatas(data);
        console.log(response.data.data);
      });
  }

  console.log(data);
  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading ? (
          <Spinner />
        ) : (
          datas.map((data, index) => {
            return (
              <Card
                key={data.id} // <~~ wajib ada sebagai pengenal satu sama lain
                first_name={data.first_name}
                last_name={data.last_name}
                username={data.username}
                image={data.image}
              />
            );
          })
        )}
      </div>
    </Layout>
  );
};
export default Home;
