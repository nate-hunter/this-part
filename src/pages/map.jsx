import React, { useState } from 'react';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';

import Layout from '../components/shared/Layout';


const INITIAL_VIEWPORT = {
    // NYC:
    latitude: 40.730824,
    longitude: -73.997330,
    zoom: 12
}


const Map = () => {
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    const [userPosition, setUserPosition] = useState(null);

    return (
        <Layout title="Map">
            <h2>Map Page...</h2>

            <ReactMapGL
                width="100vw"
                height="calc(100vh - 64px)"
                mapStyle="mapbox://styles/mapbox/light-v10"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
                onViewportChange={newViewport => setViewport(newViewport)}
                // onClick={handleMapClick}
                // scrollZoom={!mobileSize}
                {...viewport}
            >
                {/* Zoom Map */}
                <div className='navigationControl'>
                    <NavigationControl
                        onViewportChange={newViewport => setViewport(newViewport)}
                    />
                </div>

                {/* User Baloon */}
                {userPosition && (
                    <Marker
                        latitude={userPosition.latitude}
                        longitude={userPosition.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        {/* <Baloon size={50} color="#008E7C" /> */}
                        PANDA ART
                    </Marker>
                )}

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
        </Layout>
    )
}

export default Map;
