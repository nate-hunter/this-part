import React, { useState } from 'react';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';

import Layout from '../components/shared/Layout';
import Map from '../components/map/Map';


const INITIAL_VIEWPORT = {
    // NYC:
    latitude: 40.730824,
    longitude: -73.997330,
    zoom: 12
}


const MapPage = () => {


    return (
        <Layout title="Map">
            <h2>Map Page...</h2>

            <Map />
        </Layout>
    )
}

export default MapPage;
