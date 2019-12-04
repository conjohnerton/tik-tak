import React from "react";
import { Typography } from "@material-ui/core";
import { ThumbUpAltRounded } from "@material-ui/icons";

// The box that holds the upvote stuff in a YakCard
const UpvoteBox = ({ upvotes, upvoteYak }) => (
  <div
    style={{
      marginTop: "0.5em",
      display: "flex",
      justifyContent: "flex-end"
    }}
  >
    <Typography align="right" variant="body1">
      {upvotes} upvotes
    </Typography>

    {/* Upvote button! */}
    <ThumbUpAltRounded
      style={{ marginLeft: "1em", paddingBottom: ".2em" }}
      onClick={upvoteYak}
    />
  </div>
);

export default UpvoteBox;
