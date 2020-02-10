import React from 'react';
import './spinner.css';

const Spinner = (props) => {

    const width = parseInt(props.width) || 60;
    const thicknessRate = parseInt(props.thickness) || 25;

    const thickness = Math.floor(width * thicknessRate / 100 );

    const style = {
        width,
        height: parseInt(props.height)|| width,
        borderWidth: thickness,
        borderTopWidth: thickness
    };

    return (
        <div style={style} className="spinner"></div>
    )
};

export default Spinner;