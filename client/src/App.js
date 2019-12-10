import React, { useState, useEffect } from "react";
import { geolocated } from "react-geolocated";
import { withRouter, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

import useForm from "./customHooks/useForm";

import loginService from "./services/login";
import signupService from "./services/signup";
import getYaks from "./services/getYaks";
import addYak from "./services/addYak";
import deleteYak from "./services/deleteYak";
import addComment from "./services/addComment";
import upvote from "./services/upvote";
import "./App.css";

// ! When doing async calls, you can't assume that state will be up to date always!
// ! If you aren't getting the yaks you are posting, your location is probably
// ! Saved in localStorage, so sign out then in again.

const App = (props) => {
  const [currUser, setCurrUser] = useState(null);
  const loginForm = useForm((vals) => handleLogin(vals));
  const signupForm = useForm((vals) => handleSignUp(vals));
  const commentForm = useForm((vals) => handleCommentAdd(vals));
  const yakForm = useForm((vals) => handleYakAdd(vals));
  const [yakFile, setYakFile] = useState(null);
  const [yaks, setYaks] = useState([]);
  const [error, setError] = useState(null);

  // Sets error message for 3 seconds
  function setErrorMessage(message) {
    setError(message);

    setTimeout(() => setError(null), 3000);
  }

  // ! It is such a headache to get this to work with useEffect and fetchUserandYak.
  // Gets all nearby yaks and stores them in state
  async function setYakState(userData) {
    try {
      const newYaksData = await getYaks(userData.token, {
        lat: props.coords.latitude,
        lng: props.coords.longitude
      });

      // setYaks(shuffle(newYaksData.yaks));
      setYaks(
        newYaksData.yaks.sort((yak, other) => other.upvotes - yak.upvotes)
      );
    } catch (err) {
      setErrorMessage("We couldn't get the yaks near you, try again later.");
    }
  }

  // Sets state and local storage with userData
  function setUserState(userData) {
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
  }

  function handleFileAdd(file) {
    setYakFile(file);
  }

  // Sends yak to server and adds to state
  async function handleYakAdd(yakData) {
    try {
      // Send yak form data to server
      const response = await addYak(currUser.token, {
        content: yakData.content,
        lat: props.coords.latitude,
        lng: props.coords.longitude
      });

      // Adds the returned yak object on successful server addd
      if (response.success) {
        setYaks(yaks.concat(response.newYak));
        props.history.push("/dashboard");
      } else {
        alert("We couldn't add that yak.");
      }
    } catch (err) {
      // console.log(err);
      setErrorMessage("We can't add that right now, try again later.");
    }
  }

  // Send delete request and filter yak from current state
  async function handleYakDelete(yakID) {
    try {
      const response = await deleteYak(currUser.token, yakID);

      if (response.success) {
        setYaks(yaks.filter((yak) => yak._id !== yakID));
      }
    } catch (err) {
      setErrorMessage("We couldn't delete that, try again later.");
    }
  }

  // Adds comment through database and concats to yak comment state
  async function handleCommentAdd(commentData) {
    try {
      if (commentData.content.charAt(0) === " ") {
        setErrorMessage(
          "Please make sure that there are no spaces at the beginning of your comment"
        );
        return;
      }
      const response = await addComment(currUser.token, {
        content: commentData.content,
        yakId: commentData.id
      });

      if (response.success) {
        const data = {
          content: response.comment.content,
          author: response.comment.author,
          _id: response.comment._id
        };

        // Update the yak and save the new val
        const yak = yaks.find((yak) => yak._id === commentData.id);
        const updatedYak = { ...yak, comments: yak.comments.concat(data) };

        // Filter out updatedYak, and put it into new state
        setYaks(
          [
            updatedYak,
            ...yaks.filter((yak) => yak._id !== commentData.id)
          ].sort((yak, other) => other.upvotes - yak.upvotes)
        );
      } else {
        throw new Error();
      }
    } catch (err) {
      setErrorMessage("Could not add that comment at this time");
    }
  }

  // Upvotes a yak through database and updates upvote state for yak
  async function upvoteYak(yakID) {
    try {
      const response = await upvote(currUser.token, yakID);

      // On success, increment the yaks upvotes
      if (response.success) {
        // Find and update the yak with new upvote count
        const yak = yaks.find((yak) => yak._id === yakID);
        const updatedYak = { ...yak, upvotes: yak.upvotes + 1 };

        // Filter out updatedYak, and put it into new state, sorted by upvotes
        setYaks(
          [updatedYak, ...yaks.filter((yak) => yak._id !== yakID)].sort(
            (yak, other) => other.upvotes - yak.upvotes
          )
        );
      } else {
        throw new Error("Could not upvote the yak.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Logs user in and gets their nearby yaks
  async function handleLogin(creds) {
    try {
      // Gets server data response
      const userData = await loginService({
        email: creds.email,
        password: creds.password
      });

      setUserState(userData);
      setYakState(userData);
    } catch (err) {
      // Store creds back in form state

      loginForm.revertChange(creds);
      setErrorMessage("Those are not the correct credentials!");
    }
  }

  // Registers new user and saves to localStorage
  async function handleSignUp(creds) {
    try {
      // Gets server data response
      const userData = await signupService({
        email: creds.email,
        password: creds.password
      });

      setUserState(userData);
      setYakState(userData);
    } catch (err) {
      // Store creds back in form state
      signupForm.revertChange(creds);
      setErrorMessage(
        "We could not sign you up, try again later with a different email"
      );
    }
  }

  // Logs user out and removes all stored data
  const handleLogout = () => {
    window.localStorage.removeItem("tik-tak-user");
    setCurrUser(null);
    setYaks([]);
  };

  // Restores user state and gets new yaks from DB
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

        setYaks(
          userData.yaks.sort((yak, other) => other.upvotes - yak.upvotes)
        );
        setCurrUser(user);
      } catch (err) {
        setError("Our servers are under maintence, come back a bit later.");
      }
    }
  }

  // Checks if user has existing token in localStorage and signs user in if so
  useEffect(() => {
    // ! This function is defined to be immediately invoked
    // ! because useEffect can not be async, but functions within can be
    fetchUserandYaks();
  }, []);

  // Renders error message when location not enabled and no existing credentials exist
  if (
    !props.isGeolocationEnabled &&
    currUser &&
    (!currUser.lat || !currUser.lng)
  ) {
    return (
      <div>
        This app uses your current location to gather all posts from folks
        around you! Please enable location services!
      </div>
    );
  }

  // Component funcs used to to clean up render
  const LoginPage = (
    <Login
      error={error}
      handleChange={loginForm.handleChange}
      handleSubmit={loginForm.handleSubmit}
      values={loginForm.authFormVals}
    />
  );

  const SignUpPage = (
    <SignUp
      setError={setErrorMessage}
      error={error}
      handleChange={signupForm.handleChange}
      handleSubmit={signupForm.handleSubmit}
      values={signupForm.authFormVals}
    />
  );

  return (
    <div className="App">
      {currUser === null ? (
        <Redirect to="/login" />
      ) : (
        <Redirect to="/dashboard" />
      )}
      <Route
        exact
        path="/dashboard"
        render={() => (
          <Dashboard
            error={error}
            deleteYak={handleYakDelete}
            yaks={yaks}
            addActions={yakForm}
            history={props.history}
            handleLogout={handleLogout}
            currUser={currUser}
            commentActions={commentForm}
            getYaks={fetchUserandYaks}
            upvoteYak={upvoteYak}
            handleFileAdd={handleFileAdd}
          />
        )}
      />
      <Route exact path="/login" render={() => LoginPage} />
      <Route exact path="/signup" render={() => SignUpPage} />
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
