import React from "react";
import { Paper, Typography, Grid, Divider, Container } from "@material-ui/core";

const Comment = ({ splitEmail, content, classes }) => (
  <Paper elevation={2} className={classes.commentArea}>
    <Grid>
      <Container style={{ textAlign: "left", paddingTop: ".3em" }}>
        <Typography color="primary">{splitEmail}</Typography>
      </Container>
      <Divider variant="fullWidth" />
      <Typography
        className={classes.commentContent}
        variant="body2"
        style={{ wordWrap: "break-word" }}
      >
        {content}
      </Typography>
    </Grid>
  </Paper>
);

export default Comment;
