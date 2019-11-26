import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import YakCard from "./YakCard";
import SideDrawer from "./SideDrawer";
import AddPopup from "./AddPopup";

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
  function openAddDialog() {
    setOpenAdd(true);
  }

  function closeAddDialog() {
    setOpenAdd(false);
  }

  // Closes popup and submits new yak
  function handleAddCloseAndSubmit(content) {
    closeAddDialog();
    props.addActions.handleSubmit(content);
  }

  // Create list of yak card
  const shownYaks = props.yaks.map((yak) => (
    <YakCard
      yak={yak}
      deleteYak={props.deleteYak}
      key={yak._id}
      currUser={props.currUser}
      commentActions={props.commentActions}
    />
  ));

  return (
    // Dashboard is a child of SideDrawer so that it moves when the drawer opens
    <SideDrawer
      addActions={props.addActions}
      handleLogout={props.handleLogout}
      history={props.history}
      openDialog={openAddDialog}
    >
      {/* Shows add popup only if set to be open */}
      {openAdd ? (
        <AddPopup
          handleChange={props.addActions.handleChange}
          handleCloseAndSubmit={handleAddCloseAndSubmit}
          closeDialog={closeAddDialog}
          openDialog={openAddDialog}
          open={openAdd}
        />
      ) : (
        ""
      )}
      {/* Shows comment popup only if set to open
      {openComment ? (
        <CommentPopup
          handleChange={props.commentActions.handleChange}
          handleCloseAndSubmit={() => handleCommentCloseAndSubmit}
          closeDialog={closeCommentDialog}
          openDialog={openCommentDialog}
          open={openComment}
        />
      ) : (
        ""
      )} */}
      {/* Renders list of yakCards */}
      <Grid className={classes.root}>{shownYaks}</Grid>
    </SideDrawer>
  );
};

export default Dashboard;
