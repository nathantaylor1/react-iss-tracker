import React, {useEffect, useState} from "react";

import '../styles.css'

function Controls({ lat, lon }) {

    const [open, isOpen] = useState(true);

    return (
        <div className='iss-controls'>
          <div className='iss-controls-container' style={{display: "flex", flexDirection:"column"}}>
            <h2>Where's the ISS?</h2>
            <p>The ISS is currently over <b>{lat}&deg;N</b>, <b>{lon}&deg;E</b>.</p>
            <br />
            <h2></h2>
          </div>
        </div>
    );
}

export default Controls;