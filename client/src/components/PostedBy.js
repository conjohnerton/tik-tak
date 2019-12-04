import React from "react";
import { Typography } from "@material-ui/core";

const PostedBy = ({ name }) => (
  <div style={{ display: "flex" }}>
    <Typography variant="body2" color="textPrimary">
      Posted by:
    </Typography>

    <Typography style={{ marginLeft: "1em" }} variant="body2" color="primary">
      {name}
    </Typography>
  </div>
);

export default PostedBy;
