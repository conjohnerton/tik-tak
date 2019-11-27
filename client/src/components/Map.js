import React, { useState } from "react";
import MapGl, { Marker } from "react-map-gl";
import PersonPinIcon from "@material-ui/icons/PersonPin";

import keys from "../keys";

const MapBox = (props) => {
  const [state, setState] = useState({
    viewport: {
      width: 350,
      height: 350,
      latitude: props.location.lat,
      longitude: props.location.lng,
      zoom: 8
    }
  });
  return (
    <MapGl
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.mapBox}
      {...state.viewport}
      onViewportChange={(viewport) => setState({ viewport })}
    >
      <Marker
        offsetLeft={-20}
        offsetTop={-10}
        latitude={props.location.lat}
        longitude={props.location.lng}
      >
        <div>You are here!</div>
        <PersonPinIcon style={{ marginLeft: "1em" }} />
      </Marker>
    </MapGl>
  );
};

export default MapBox;
