import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user info: ", userCredential.user);
      const user = userCredential.user;
      const idTokenResult = await user.accessToken;
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult,
        },
      });
      navigate("/");
    } catch (error) {
      const openError = (type) => {
        notification[type]({
          message: "Error",
          description: error.message,
        });
      };
      openError("error");
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            autoFocus
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <br />
        <Button
          type="primary"
          onClick={handleSubmit}
          className="mb-3"
          block
          shape="round"
          icon={<MailOutlined />}
          size="large"
          disabled={!email || password.length < 8}
        >
          Login with Email/Password
        </Button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login page</h4>
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
