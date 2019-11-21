import React from "react";
import YakCard from "./YakCard";
import SideDrawer from "./SideDrawer";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();

  // Create list of yak card
  const shownYaks = props.yaks.map((yak) => (
    <YakCard
      yak={yak}
      deleteYak={props.deleteYak}
      key={yak._id}
      currUser={props.currUser}
    />
  ));

  return (
    <SideDrawer
      addActions={props.addActions}
      handleLogout={props.handleLogout}
      history={props.history}
    >
      <Grid className={classes.root}>{shownYaks}</Grid>
    </SideDrawer>
  );
};

export default Dashboard;
