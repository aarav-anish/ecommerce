import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {};

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
