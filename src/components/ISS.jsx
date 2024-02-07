import React, {useEffect, useState} from "react";
import ShowMap from "./ShowMap";
import Controls from "./Controls";
import '../styles.css'

function ShowISS() {

  const [stationLat, setStationLat] = useState("0");
  const [stationLon, setStationLon] = useState("0");
  const [refreshInterval, setRefreshInterval] = useState(10000);

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
      <ShowMap lat={stationLat} lon={stationLon} />
      <Controls lat={stationLat} lon={stationLon} />
    </div>
  );
}

export default ShowISS;