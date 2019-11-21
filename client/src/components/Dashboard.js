import React, { useState } from "react";
import YakCard from "./YakCard";
import SideDrawer from "./SideDrawer";
import { makeStyles } from "@material-ui/core/styles";
import AddPopup from "./AddPopup";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const [openAdd, setOpenAdd] = useState(false);

  // The next three are Add Popup actions
  // Toggles add oppup
  const openDialog = () => {
    setOpenAdd(true);
  };

  function closeDialog() {
    setOpenAdd(false);
  }

  // Closes popup and submits new yak
  function handleCloseAndSubmit(content) {
    closeDialog();
    props.addActions.handleSubmit(content);
  }

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
      openDialog={openDialog}
    >
      {/* Shows add popup only if set to be open */}
      {openAdd ? (
        <AddPopup
          handleChange={props.addActions.handleChange}
          handleCloseAndSubmit={handleCloseAndSubmit}
          closeDialog={closeDialog}
          openDialog={openDialog}
          open={openAdd}
        />
      ) : (
        ""
      )}

      {/* Renders list of yakCards */}
      <Grid className={classes.root}>{shownYaks}</Grid>
    </SideDrawer>
  );
};

export default Dashboard;
