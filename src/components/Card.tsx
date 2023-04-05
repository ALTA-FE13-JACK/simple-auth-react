import { Link } from "react-router-dom";
import { FC } from "react";
import Form from "./Form";

interface Props {
  image: string;
  username: string;
  first_name: string;
  last_name: string;
}

const Card: FC<Props> = (props) => {
  const { image, username, first_name, last_name } = props;

  return (
    <Form>
      <div className="flex flex-col items-center p-3">
        <img
          src={image}
          alt={`${username}'s picture`}
          className="rounded-full w-28 aspect-square"
        />
        <Link
          className="font-bold tracking-wider dark:text-white"
          to={`/profile/${username}`}
        >
          {first_name} {last_name}
        </Link>
        <p className="text-sm dark:text-white">{username}</p>
      </div>
    </Form>
  );
};

export default Card;
