import React, { useState } from "react";

import AddPopup from "./AddPopup";

const Dashboard = (props) => {
  return (
    <div>
      <h1>This is the dashboard</h1>
      <AddPopup
        handleChange={props.addActions.handleChange}
        handleSubmit={props.addActions.handleSubmit}
        formValues={props.addActions.authFormValues}
      />
    </div>
  );
};

export default Dashboard;
