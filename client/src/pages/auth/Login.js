import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";

import axios from "axios";

const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: { authToken: authToken },
    }
  );
};

const Login = () => {
  // redirect to home page if user is already logged in
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      const userToken = user.accessToken;
      const googleToken = credential.accessToken;

      createOrUpdateUser(userToken)
        .then((res) => console.log("create or update result", res))
        .catch();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          userToken: userToken,
          googleToken: googleToken,
        },
      });
      navigate("/");
    } catch (error) {
      const openError = (type) => {
        notification[type]({
          message: `Error {error.code}`,
          description: error.message,
        });
      };
      openError("error");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.accessToken;
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: token,
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
      setLoading(false);
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
        <Button
          type="primary"
          onClick={googleLogin}
          className="mb-3"
          danger
          block
          shape="round"
          icon={<GoogleOutlined />}
          size="large"
        >
          Login with Google
        </Button>
        <Link
          to="/forgot/password"
          className="text-decoration-none text-danger float-end"
        >
          Forgot Password
        </Link>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading ...</h4>
          ) : (
            <h4>Login page</h4>
          )}
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
