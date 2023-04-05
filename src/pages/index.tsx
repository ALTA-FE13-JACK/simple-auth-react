import { FC, useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "@/components/Loading";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { UserType } from "@/utils/types/user";
import { useTitle, useFetchGet } from "@/utils/hooks";
import { Form } from "react-router-dom";

const Home: FC = () => {
  const [datas, setDatas] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(true);
  const [data] = useFetchGet(
    "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0/users"
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
      })
      .catch((error) => {
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
        const { data } = response;
        console.log(data);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  return (
    <Layout>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {loading ? (
          <Spinner />
        ) : (
          datas.map((data, index) => {
            return (
              <Card
                key={data.id}
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
