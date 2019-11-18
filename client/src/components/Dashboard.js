import React, { useState } from "react";
import AddPopup from "./AddPopup";
import YakCard from "./YakCard";
import SideDrawer from "./SideDrawer";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();

  // Create list of yak card
  const shownYaks = props.yaks.map((yak) => (
    <YakCard yak={yak} deleteYak={props.deleteYak} key={yak._id} />
  ));

  return (
    <SideDrawer handleLogout={props.handleLogout} history={props.history}>
      <Grid className={classes.root}>
        {shownYaks}
        <Grid
          container
          direction="row"
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
    </SideDrawer>
  );
};

export default Dashboard;
