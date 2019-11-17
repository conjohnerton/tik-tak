import React from "react";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

export default function FloatingActionButtons({ openDialog }) {
  return (
    <Fab color="primary" aria-label="add" onClick={openDialog}>
      <EditIcon />
    </Fab>
  );
}
