import React from 'react';
import "./Timer.css"

const Timer = ({time}) => {
    return (
        <div className="Timer">
            <span>{time}</span>
        </div>
    );
};

export default Timer;