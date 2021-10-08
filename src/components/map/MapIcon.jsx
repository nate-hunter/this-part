import { Circle } from '@mui/icons-material';
import React from 'react';
// import CircleIcon from '@mui/icons-material/Circle';

const MapIcon = ({ size, color, onClick }) => {
    // <CircleIcon onClick={onClick} />
    return <Circle style={{ color, fontSize: size }} />

}

export default MapIcon;