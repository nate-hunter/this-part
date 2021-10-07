import { Circle } from '@mui/icons-material';
import React, { useState } from 'react';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import Layout from '../shared/Layout';
import MapIcon from './MapIcon';


const INITIAL_VIEWPORT = {
    // NYC:
    latitude: 40.730824,
    longitude: -73.997330,
    zoom: 12
}


const Map = () => {
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    const [userPosition, setUserPosition] = useState(null);
    const [popup, setPopup] = useState(null);

    const handleMapClick = ({ lngLat, leftButton }) => {
        console.log('map clicked', leftButton, lngLat)
    }

    return (
        <>
            <ReactMapGL
                width="100vw"
                height="calc(100vh - 64px)"
                mapStyle="mapbox://styles/mapbox/light-v10"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
                onViewportChange={newViewport => setViewport(newViewport)}
                onClick={handleMapClick}
                // scrollZoom={!mobileSize}
                {...viewport}
            >
                <div className='navigationControl'>
                    <NavigationControl
                        onViewportChange={newViewport => setViewport(newViewport)}
                    />
                </div>

                <Marker
                    latitude={40.730824}
                    longitude={-73.997330}
                >
                    {/* <MapIcon /> */}
                    <Circle />
                </Marker>

                {/* User Baloon */}
                {/* {userPosition && (
                    <Marker
                        latitude={userPosition.latitude}
                        longitude={userPosition.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <MapIcon size={50} color="#008E7C"  />
                    </Marker>
                )} */}

                {/* Draft Baloon  */}
                {/* {state.draft && (
                    <Marker
                        latitude={state.draft.latitude}
                        longitude={state.draft.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <Baloon size={50} color="grey" />
                    </Marker>

                )} */}

                {/* Previously added Posts  */}
                {/* {state.posts.map(post => (
                    <Marker
                        key={post._id}
                        latitude={post.lat}
                        longitude={post.lon}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <Baloon
                            onClick={() => handleSelectPost(post)}
                            size={50}
                            color={highlightNewPost(post)}
                        />
                    </Marker>
                ))} */}


            </ReactMapGL>
        </>
    )
}

export default Map;
