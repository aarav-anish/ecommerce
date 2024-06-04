import React, { useState } from "react";
import { notification } from "antd";

import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const actionCodeSettings = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
        handleCodeInApp: true,
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);

      // Success message
      const openSuccess = (type) => {
        notification[type]({
          message: "Success",
          description:
            "A password reset link has been sent to your registered email",
        });
      };
      openSuccess("success");
      setLoading(false);
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
      setLoading(false);
    }
  };

  const forgotPasswordForm = () => {
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
        <button type="submit" className="btn btn-primary" disabled={!email}>
          Submit
        </button>
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
            <h4>Forgot Password</h4>
          )}
          {forgotPasswordForm()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
