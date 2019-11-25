import React from "react";
import { Paper, Typography, Grid, Divider, Container } from "@material-ui/core";

export default Comment = ({ splitEmail, content, classes }) => (
  <Paper elevation={2} className={classes.commentArea}>
    <Grid wrap="wrap" direction="row" alignItems="space-between">
      <Container style={{ textAlign: "left", paddingTop: ".3em" }}>
        <Typography color="primary">{splitEmail}</Typography>
      </Container>
      <Divider variant="fullWidth" />
      <Typography className={classes.commentContent} variant="body2">
        {content}
      </Typography>
    </Grid>
  </Paper>
);
