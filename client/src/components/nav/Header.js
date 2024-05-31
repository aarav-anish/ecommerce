import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const handleLogout = async () => {
    console.log("logout is clicked");
    await signOut(auth);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  const onClick = (e) => {
    console.log("click", e);
    setCurrent(e.key);
  };

  const homeItem = [
    {
      label: (
        <Link to="/" class="text-decoration-none">
          Home
        </Link>
      ),
      key: "home",
      icon: <AppstoreOutlined />,
    },
  ];

  const loggedInItem = [
    {
      label: user?.email.split("@")[0],
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          label: "Dashboard",
          key: "dashboard",
        },
        {
          label: "Logout",
          key: "logout",
          icon: <LogoutOutlined />,
          onClick: handleLogout,
        },
      ],
    },
  ];

  const loggedOutItem = [
    {
      label: (
        <Link to="/login" class="text-decoration-none">
          Login
        </Link>
      ),
      key: "login",
      icon: <UserOutlined />,
    },
    {
      label: (
        <Link to="/register" class="text-decoration-none">
          Register
        </Link>
      ),
      key: "register",
      icon: <UsergroupAddOutlined />,
    },
  ];

  return (
    <div className="d-flex">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={homeItem}
        style={{ flex: "1" }}
        className="d-flex justify-content-start"
      />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={user ? loggedInItem : loggedOutItem}
        style={{ flex: "1" }}
        className="d-flex justify-content-end"
      />
    </div>
  );
};

export default Header;
