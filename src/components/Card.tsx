import React, { Component } from "react";
import { Link } from "react-router-dom";
interface props {
  image: string;
  username: string;
  fisrt_name: string;
  last_name: string;
}

export class Card extends Component<props> {
  render() {
    const { image, username, fisrt_name, last_name } = this.props;

    return (
      <div className="flex flex-col items-center">
        <img
          src={image}
          alt={` ${username}'s picture`}
          className="rounded-full w-28 aspect-square"
        />
        <Link to={`profile/${username}`} className="font-bold tracking-wider">
          {fisrt_name} {last_name}
        </Link>
        <p className="text-sm">{username}</p>
      </div>
    );
  }
}

export default Card;
