import {
  HiMenu,
  HiUser,
  HiOutlineLogin,
  HiOutlineUserAdd,
} from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";
import { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import withRouter, { NavigateParams } from "@/utils/navigation";
import Images from "../assets/react.svg";

export class Navbar extends Component<NavigateParams> {
  render() {
    return (
      <nav className="bg-cyan-900 w-full h-12 flex items-center justify-between p-5">
        <Link to="/">
          <img src={Images} alt="" />
        </Link>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <HiMenu className="h-5 " />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-cyan-900 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => this.props.navigate(`profile/testing`)}
                  >
                    {" "}
                    <HiUser className="h-5 mr-2" />
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-cyan-900 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => this.props.navigate(`/login`)}
                  >
                    {" "}
                    <HiOutlineLogin className="h-5 mr-2" />
                    <a> Login</a>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-cyan-900 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => this.props.navigate(`/register`)}
                  >
                    {" "}
                    <HiOutlineUserAdd className="h-5 mr-2" />
                    Register
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </nav>
    );
  }
}
export default withRouter(Navbar);
