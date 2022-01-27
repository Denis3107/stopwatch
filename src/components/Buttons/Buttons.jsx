import React from 'react';
import "./Buttons.css"

const Buttons = ({status, start, reset,wait}) => {

    return (
        <div className="Buttons">
            <button className= {status ? "Buttons__Stop" : "Buttons__Start"} onClick={start}> {status ? "Stop" : "Start"} </button>
            <button className="Buttons__Wait" onClick={wait}>Wait</button>
            <button className="Buttons__Reset" onClick={reset}>Reset</button>
        </div>
    );
};

export default Buttons;