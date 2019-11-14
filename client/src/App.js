import React, { useState } from "react";
import { geolocated } from "react-geolocated";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import useForm from "./customHooks/useForm";
import loginService from "./services/login";
import "./App.css";

// ???????????????TODO: Figure out why geolocated is switching on and off

const App = (props) => {
  const [currUser, setCurrUser] = useState({});
  const loginForm = useForm((vals) => loginUser(vals));
  // const signupForm = useForm((vals) => setCurrUser(vals));
  const [yaks, setYaks] = useState([]);

  // TODO: Gets all nearby yaks using current location

  // Logs user in
  async function loginUser(creds) {
    try {
      // Gets server data response
      const userData = await loginService({
        email: creds.email,
        password: creds.password
      });

      // Pay attention to the structure of the response!!!
      // userData = { token: 324jwaje254q8f, user: { id: jsadf34w34, email: test@gmail.com }}

      // Sets current user then adds to localStorage
      setCurrUser({ email: userData.user.email, token: userData.token });

      window.localStorage.setItem(
        "tik-tak-user",
        JSON.stringify({ email: userData.user.email, token: userData.token })
      );

      // TODO: Get all the nearby yaks from server
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  // Logs user out and removes all stored user data
  const handleLogout = () => {
    window.localStorage.removeItem("tik-tak-user");
    setCurrUser(null);
    setYaks([]);
  };

  return (
    <div className="App">
      <Login
        handleChange={loginForm.handleChange}
        handleSubmit={loginForm.handleSubmit}
        values={loginForm.authFormVals}
      />
      {/* <SignUp
        handleChange={signupForm.handleChange}
        handleSubmit={signupForm.handleSubmit}
        values={signupForm.authFormVals}
      /> */}
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App);
