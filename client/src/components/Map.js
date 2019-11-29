import React, { useState, useEffect } from "react";
import MapGl, { Marker } from "react-map-gl";
import Typography from "@material-ui/core/Typography";
import PersonPinIcon from "@material-ui/icons/PersonPin";

import getMapKey from "../services/getMapKey";

const MapBox = (props) => {
  const [state, setState] = useState({
    viewport: {
      width: 325,
      height: 325,
      latitude: props.location.lat,
      longitude: props.location.lng,
      zoom: 8
    }
  });

  const getKey = async () => {
    try {
      const a = await getMapKey();
      setM(a.key);
    } catch (err) {
      return "No api key provided for mapBox";
    }
  };

  function getWindowWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  const [m, setM] = useState("");

  useEffect(() => {
    getKey();
  }, []);

  return (
    <>
      {/* I picked 1152px as the max width for the map, since that's when the yaks started fuzzing around */}
      {m !== "" && getWindowWidth() > 1152 ? (
        <>
          <Typography>Your current location:</Typography>

          <MapGl
            style={{ marginBottom: "1em" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken={m}
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
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default MapBox;
