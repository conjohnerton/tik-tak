import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link style={{ textDecoration: "none" }} to="/login">
        tik-tak
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
