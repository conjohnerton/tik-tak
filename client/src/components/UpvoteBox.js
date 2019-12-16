import React from "react";
import { Typography, Button } from "@material-ui/core";
import { ThumbUpAltRounded } from "@material-ui/icons";

// The box that holds the upvote stuff in a YakCard
const UpvoteBox = ({ upvotes, upvoteYak }) => {
  // Upvote status gets reset every time app refreshes
  const [upvoted, setUpvoted] = React.useState(false);
  function submitUpvote() {
    setUpvoted(true);
    upvoteYak();
  }

  return (
    <div
      style={{
        marginTop: "0.5em",
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Typography style={{ paddingTop: ".5em" }} align="right" variant="body1">
        {upvotes} upvotes
      </Typography>

      {/* Upvote button! */}
      <Button disabled={upvoted} onClick={submitUpvote}>
        <ThumbUpAltRounded />
      </Button>
    </div>
  );
};

export default UpvoteBox;
