import React, { useState, useEffect } from "react";
import { geolocated } from "react-geolocated";
import { withRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import useForm from "./customHooks/useForm";
import loginService from "./services/login";
import getYaks from "./services/getYaks";
import "./App.css";

// !!!When doing async calls, you can't assume that state will be up to date always!

const App = (props) => {
  const [currUser, setCurrUser] = useState({});
  const loginForm = useForm((vals) => handleLogin(vals));
  const signupForm = useForm((vals) => setCurrUser(vals));
  const [yaks, setYaks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Checks if user has existing token in localStorage and signs user in if so
  useEffect(() => {
    // Sets loading, for User Experience purposes
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Restores user state, if in localStorage
    async function fetchUserandYaks() {
      // Parse item from localStorage
      const user = JSON.parse(window.localStorage.getItem("tik-tak-user"));

      // If user, lat, and lng are saved, render from past location
      if (user && user.lat && user.lng) {
        try {
          const userData = await getYaks(user.token, {
            lat: user.lat,
            lng: user.lng
          });

          setYaks(userData.yaks);
          setCurrUser(user);
        } catch (err) {
          console.log(err);
        }
      }
    }

    // ! This function is defined to be immediately invoked
    // ! because useEffect can not be async, but functions within can be
    fetchUserandYaks();
  }, []);

  // Logs user in and gets their nearby yaks
  async function handleLogin(creds) {
    try {
      // Gets server data response
      const userData = await loginService({
        email: creds.email,
        password: creds.password
      });

      // ! Pay attention to the structure of the response!!!
      // ! userData = { token: 324jwaje254q8f, user: { id: jsadf34w34, email: test@gmail.com }}

      // Sets current user with current location
      setCurrUser({
        email: userData.user.email,
        token: userData.token,
        lat: props.coords.latitude,
        lng: props.coords.longitude
      });

      // Stores user credentials in localStorage for sign on
      window.localStorage.setItem(
        "tik-tak-user",
        JSON.stringify({
          email: userData.user.email,
          lat: props.coords.latitude,
          lng: props.coords.longitude,
          token: userData.token
        })
      );

      // Get all nearby yaks
      const newYaksData = await getYaks(userData.token, {
        lat: props.coords.latitude,
        lng: props.coords.longitude
      });

      setYaks(newYaksData.yaks);
    } catch (err) {
      console.log(err);
    }
  }

  // Logs user out and removes all stored data
  const handleLogout = () => {
    window.localStorage.removeItem("tik-tak-user");
    setCurrUser(null);
    setYaks([]);
  };

  // Renders error message when location not enabled
  if (!props.isGeolocationEnabled) {
    return (
      <div>
        This app uses your current location to gather all posts from folks
        around you! Please enable location services!
      </div>
    );
  }

  // Component funcs used to to clean up render
  const LoginPage = () => (
    <Login
      handleChange={loginForm.handleChange}
      handleSubmit={loginForm.handleSubmit}
      values={loginForm.authFormVals}
    />
  );

  const SignUpPage = () => (
    <SignUp
      handleChange={signupForm.handleChange}
      handleSubmit={signupForm.handleSubmit}
      values={signupForm.authFormVals}
    />
  );

  return (
    <div className="App">
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignUpPage} />
    </div>
  );
};

// Export App with geolocation
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(withRouter(App));
