import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { auth } from "../../firebase";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";

const RegisterComplete = () => {
  const navigate = useNavigate();
  let email = window.localStorage.getItem("emailForSignIn");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // setEmail(window.localStorage.getItem("emailForSignIn"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      const openPasswordError = (type) => {
        notification[type]({
          message: "Error",
          description: "Password must be at least 8 characters long",
        });
      };
      openPasswordError("error");
      return;
    }
    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt("Please provide your email for confirmation");
        }
      }

      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      console.log("result", result);

      if (result.user.emailVerified) {
        // Clear email from storage.
        window.localStorage.removeItem("emailForSignIn");

        // update password
        let user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = user.getIdTokenResult;

        // redux store
        console.log("user: ", user, " idToken: ", idTokenResult);

        // redirect
        navigate("/");
      }
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

  const completeRegistrationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          class="form-control"
          value={email}
          placeholder="Re-enter email after clicking register"
          disabled
        />
        <input
          type="password"
          class="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your passsword"
          required
          autoFocus
        />
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
          <h4>Complete Registration page</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
