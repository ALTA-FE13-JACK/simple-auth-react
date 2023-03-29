import React, { Component } from "react";

interface props {
  images: string;
  username: string;
  fisrt_name: string;
  last_name: string;
}

export class Card extends Component<props> {
  render() {
    const { images, username, fisrt_name, last_name } = this.props;

    return (
      <div className="flex flex-col items-center">
        <img
          src={images}
          alt={` ${username}'s picture`}
          className="rounded-full w-28 aspect-square"
        />
        <p className="font-bold tracking-wider">
          {fisrt_name} {last_name}
        </p>
        <p className="text-sm">{username}</p>
      </div>
    );
  }
}

export default Card;
