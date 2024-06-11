import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

const Register = () => {
  // redirect to home page if user is already logged in
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const actionCodeSettings = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      // Success message
      const openSuccess = (type) => {
        notification[type]({
          message: "Success",
          description: "Please check your email and follow the link provided",
        });
      };
      openSuccess("success");
      // save the email in local storage
      window.localStorage.setItem("emailForSignIn", email);
      setEmail("");
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

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          class="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          autoFocus
        />
        <br />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register page</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
