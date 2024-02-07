import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'
import '../styles.css'

const RecenterAutomatically = ({lat, lon}) => {
    const map = useMap();
  
    useEffect(() => {
      map.setView([lat, lon]);
    }), [lat, lon];
  
    return null;
  }

function ShowMap({ lat, lon }) {

    return (
        <div className='iss-container'>
            <div style={{ display:'flex', height:'100vh', width:'100%' }}>
                <MapContainer center={[parseFloat(lat), parseFloat(lon)]} zoom={3} style={{ flex:'1', width:'100%' }}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={[lat, lon]} />
                    <RecenterAutomatically lat={lat} lon={lon} />
                </MapContainer>
            </div>
        </div>
        
    );
}

export default ShowMap;