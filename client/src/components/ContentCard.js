import React from "react";
import { Paper, Typography } from "@material-ui/core";

const ContentCard = ({ style, content }) => (
  <Paper className={style} elevation={2}>
    <Typography variant="body2" style={{ wordWrap: "break-word" }}>
      {content}
    </Typography>
  </Paper>
);

export default ContentCard;
