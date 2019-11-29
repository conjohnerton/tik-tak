import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core/";

import YakCard from "./YakCard";
import SideDrawer from "./SideDrawer";
import AddPopup from "./AddPopup";
import Map from "./Map";

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

      {/* Renders list of yakCards */}
      <Grid
        container
        className={classes.root}
        direction="row"
        alignContent="stretch"
        justify="flex-start"
        // alignItems="center"
      >
        <Grid item>
          <Grid>
            {/* Passes location to Map if user is signed in */}
            {props.currUser ? (
              <Map
                location={{
                  lat: props.currUser.lat,
                  lng: props.currUser.lng
                }}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Grid>{shownYaks}</Grid>
        </Grid>
      </Grid>
    </SideDrawer>
  );
};

export default Dashboard;
