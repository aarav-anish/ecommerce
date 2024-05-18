import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const items1 = [
  {
    label: (
      <Link to="/" class="text-decoration-none">
        Home
      </Link>
    ),
    key: "home",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Username",
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
      },
    ],
  },
];

const items2 = [
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

const Header = () => {
  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click", e);
    setCurrent(e.key);
  };
  return (
    <div className="d-flex">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items1}
        style={{ flex: "1" }}
        className="d-flex justify-content-start"
      />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items2}
        style={{ flex: "1" }}
        className="d-flex justify-content-end"
      />
    </div>
  );
};

export default Header;
