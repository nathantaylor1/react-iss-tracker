import React, {useEffect, useState} from "react";
import ShowMap from "./ShowMap";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

      <div className='iss-controls'>
        <div className='iss-controls-container' style={{display: "flex", flexDirection:"column"}}>
          <h2>Where's the ISS?</h2>
          <p>The ISS is currently over <b>{stationLat}&deg;N</b>, <b>{stationLon}&deg;E</b>.</p>
          <br />
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={recenter} onChange={() => setRecenter(!recenter)} />} label="Automatically re-center." />
          </FormGroup>
          </div>
      </div>
    </div>
  );
}

export default ShowISS;