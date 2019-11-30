import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core/";

import YakCard from "./YakCard";
import SideDrawer from "./SideDrawer";
import AddPopup from "./AddPopup";
import Map from "./Map";
import AffiliateLink from "./AffiliateLink";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));

function getWindowWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

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
    // The real dashboard is a child of SideDrawer so that it moves when the drawer opens
    <SideDrawer
      addActions={props.addActions}
      handleLogout={props.handleLogout}
      history={props.history}
      openDialog={openAddDialog}
      error={props.error}
      getYaks={props.getYaks}
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

      {/* Error message is rendered at top of dashboard */}
      <Typography
        color="error"
        variant="overline"
        display="block"
        align="center"
      >
        {props.error}
      </Typography>

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

          {/* Renders an Ad message if window is big :) */}
          {getWindowWidth() > 1152 ? <AffiliateLink /> : ""}
        </Grid>
        <Grid item>
          {/* Renders an Ad message :) */}
          {getWindowWidth() < 1152 ? <AffiliateLink /> : ""}
          <Grid>{shownYaks}</Grid>
        </Grid>
      </Grid>
    </SideDrawer>
  );
};

export default Dashboard;
