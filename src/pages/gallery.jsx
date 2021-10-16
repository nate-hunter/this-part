import React from 'react';
import Gallery from '../components/gallery/Gallery';
import Layout from '../components/shared/Layout';

const galleryStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}

const gallery = () => {
    return (
        <Layout title="Gallery">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                alignItems: 'center'
            }}>

                <h2>Gallery Page..</h2>
                <Gallery />
            </div>
        </Layout>
    )
}

export default gallery;
