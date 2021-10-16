import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/shared/Layout';

const landing = () => {
    return (
        <Layout title="Home">
            <div className="landing">
                <div className="landing-container">
                    <h1 className='page-title'>this pArt</h1>


                    <p>Welcome to this place to share public art.</p>

                    <div className="landing-btns">
                        <Link to='/map' >
                            <button id="landing-btn">Map</button>
                        </Link>
                        <Link to='/gallery'>
                            <button id="landing-btn">Gallery</button>
                        </Link>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default landing;
