import React, { useState } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { notification } from "antd";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const actionCodeSettings = {
      url: "http://localhost:3000/register/complete",
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
  };

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <label for="email">Enter your email</label>
        <input
          type="email"
          class="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          <h4>Register page</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
