import React, {useEffect, useState} from "react";
import ShowMap from "./ShowMap";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

import '../styles.css'

function ShowISS() {

  const [stationLat, setStationLat] = useState("0");
  const [stationLon, setStationLon] = useState("0");
  const [refreshInterval, setRefreshInterval] = useState(10000);

  const [recenter, setRecenter] = useState(true);

  function UpdateStationPosition() {
    console.log("Fetching ISS position...");
    fetch('http://api.open-notify.org/iss-now.json')
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json()
    })
    .then((data) => {
      setStationLat(data['iss_position']['latitude']);
      setStationLon(data['iss_position']['longitude']);
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    console.log("UseEffect")
    UpdateStationPosition();
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(UpdateStationPosition, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval, setStationLat, setStationLon]);

  return (
    <div className='iss'>
      <ShowMap lat={stationLat} lon={stationLon} recenter={recenter} />
      <AppBar style={{}} position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
            <SettingsIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Internation Space Station Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ShowISS;