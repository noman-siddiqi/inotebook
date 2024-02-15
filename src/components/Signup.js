import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const host = "http://localhost:3100/api/auth/";
  const endpoint = "/createUser";
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(host + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    });
    const token = await response.json();
    if (token.success) {
      // Save the auth token and redirect
      localStorage.setItem("auth-token", token);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-2 mx-3">
      <h1 className="my-3">Create an account to use iNotebook app</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={user.password}
              onChange={onChange}
              required
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              value={user.cpassword}
              onChange={onChange}
              required
              minLength={5}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Signup;
