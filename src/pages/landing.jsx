import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import Context from '../context';

const Landing = () => {
    const { me } = useContext(Context);
    const { username } = me;
    return (
        <Layout title="Home">
            <div className="landing">
                <div className="landing-container">
                    <h1 className='landing-page-title'>- this pArt -</h1>


                    <h2>Welcome <span className="landing-emphasis">{username}</span>!</h2>

                    <p>View public art pieces from around the world on a <span className="landing-emphasis">map</span> or explore the <span className="landing-emphasis">gallery</span> of public art pieces.</p>

                    <div className="landing-btns">
                        <Link to='/map' >
                            <button className="landing-btn">Map</button>
                        </Link>
                        <Link to='/gallery'>
                            <button className="landing-btn">Gallery</button>
                        </Link>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Landing;
