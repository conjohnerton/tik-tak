import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";

export default ({ openAddDialog }) => (
  <Paper
    style={{
      padding: "1em",
      maxWidth: "500",
      margin: "1em 1em 1em 1em"
    }}
  >
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography>
        It appears that there are no posts in your area... Add one and get
        noticed!
      </Typography>
      <Button variant="outlined" onClick={openAddDialog}>
        Add a Post
      </Button>
    </div>
  </Paper>
);
