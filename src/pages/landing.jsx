import React from 'react';
import Layout from '../components/shared/Layout';

const landing = () => {
    return (
        <Layout title="Home">
            <div className="landing">
                <div className="landing-container">
                    <h1 className='page-title'>this pArt</h1>


                    <p>Welcome to this place to share public art.</p>

                    <div className="landing-btns">
                        <button id="landing-btn">Map</button>
                        <button id="landing-btn">Gallery</button>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default landing;
