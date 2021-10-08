import React, { useState } from 'react';

import Layout from '../components/shared/Layout';
import Map from '../components/map/Map';


const MapPage = () => {
    return (
        <Layout title="Map">
            <Map />
        </Layout>
    )
}

export default MapPage;
