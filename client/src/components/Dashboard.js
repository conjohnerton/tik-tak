import React, { useState } from "react";
import AddPopup from "./AddPopup";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { green } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  greenAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: green[500]
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();

  const shownYaks = props.yaks.map((yak) => (
    <Paper className={classes.paper}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <Avatar className={classes.greenAvatar}>
                  <AssignmentIcon />
                </Avatar>

                <Typography variant="body2" color="primary">
                  {yak.author}
                </Typography>
              </Grid>

              <Paper className={classes.paper}>
                <Typography
                  variant="body2"
                  style={{ "word-wrap": "break-word" }}
                >
                  {yak.content}
                </Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                Remove
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid item>
            <Typography variant="subtitle1">{yak.author}</Typography>
          </Grid> */}
        </Grid>
      </Grid>
    </Paper>
  ));

  return (
    <Grid className={classes.root}>
      {shownYaks}
      <Grid
        container
        direction="row"
        // alignItems="flex-end"
        justify="flex-end"
        style={{ marginRight: "1em" }}
      >
        <AddPopup
          handleChange={props.addActions.handleChange}
          handleSubmit={props.addActions.handleSubmit}
          formValues={props.addActions.authFormValues}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
