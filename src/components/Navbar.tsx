import {
  HiMenu,
  HiUser,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUserAdd,
} from "react-icons/hi";
import withReactContent from "sweetalert2-react-content";
import { Menu, Transition, Switch } from "@headlessui/react";
import { FC, Fragment, useState, useContext, useEffect } from "react";
import { NavigateParam } from "@/utils/navigation";

import { ThemeContext } from "@/utils/context";
import { RootState } from "@/utils/types/redux";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Images from "../assets/react.svg";
import Swal from "@/utils/swal";

const Navbar: FC = () => {
  const { uname, isLoggedIn } = useSelector((state: RootState) => state.data);
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(false);
  const [, , removeCookie] = useCookies();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  function handleTheme(mode: string) {
    setTheme(mode);
  }

  function handleLogout() {
    MySwal.fire({
      title: "Logout",
      text: "Are you sure?",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("tkn");
        removeCookie("uname");
        navigate("/login");
      }
    });
  }

  return (
    <nav className="bg-cyan-900 dark:bg-slate-800 w-full h-12 flex items-center justify-between p-5">
      <Link to="/">
        <div className="flex flex-row ">
          <img src={Images} alt="" />
          <p className="text-white p-2 font-bold">User Management</p>
        </div>
      </Link>

      <Menu as="div" className=" relative inline-block text-left">
        <div className="flex flex-row items-center">
          <div className="p-3">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? "bg-white bg-opacity-20" : "bg-black bg-opacity-20"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
              onClick={() => handleTheme(theme === "dark" ? "light" : "dark")}
            >
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-blackbg-opacity-20 px-4 py-2 text-sm font-medium text-white bg-black bg-opacity-20 dark:bg-white  dark:bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <HiMenu className="h-5 " />
            </Menu.Button>
          </div>
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white  dark:bg-gray-500  shadow-lg ring-1 ring-blue-600 ring-opacity-5 focus:outline-none">
            {isLoggedIn && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-cyan-900 dark:bg-slate-800 text-white"
                        : "text-gray-900 dark:text-gray-200"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => navigate(`/profile/${uname}`)}
                    id="nav-profile"
                  >
                    <HiUser className="h-5 mr-2 w-5" />
                    Profile
                  </button>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-cyan-900 dark:bg-slate-800 text-white"
                      : "text-gray-900 dark:text-gray-200"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() =>
                    isLoggedIn ? handleLogout() : navigate("/login")
                  }
                >
                  {isLoggedIn ? (
                    <>
                      <HiOutlineLogout className="h-5 mr-2 w-5" />
                      Logout
                    </>
                  ) : (
                    <>
                      <HiOutlineLogin className="h-5 mr-2 w-5" />
                      Login
                    </>
                  )}
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </nav>
  );
};

export default Navbar;
