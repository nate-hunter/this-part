import { Circle } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
// import { formatDate}

import './map.css';
import Layout from '../shared/Layout';
import MapIcon from './MapIcon';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../../graphql/queries';


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
    const [posts, setPosts] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);


    const { data, loading, error } = useQuery(GET_ALL_POSTS);


    useEffect(() => {
        try {
            if (!loading) setPosts(data.posts);
        } catch (error) {
            console.error('Error getting posts\n', error)
        }

    }, [loading])

    if (loading) return <h3>Map is loading...</h3>; // Use a LoadingPage here


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

                {data && posts.map(post => (  // I might make this into its own component...
                    <>
                        {/* {console.log('post:', post)} */}
                        <Marker
                            key={post.id}
                            latitude={post.lat}
                            longitude={post.lon}
                        >
                            <MapIcon color='slateblue' size={15} />
                        </Marker>

                        {post.id === currentPlaceId && (<Popup
                            anchor="right"
                            latitude={40.730824}
                            longitude={-73.997330}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setPopup(null)}
                        >
                            <div className="popup-card">
                                {/* <img src="" alt="" /> */}
                                <label>Title</label>
                                <h4 className="popup-item">{post.title}</h4>
                                <label>Location</label>
                                <h4 className="popup-item">{post.area}</h4>
                                <label>Description</label>
                                <p className="popup-descr">{post.content}</p>
                                <span className="username">Created by <b>{post.username}</b></span>
                                <span className="date-created">{post.created_at}</span>
                            </div>

                        </Popup>)}
                    </>
                ))}



            </ReactMapGL>
        </>
    )
}

export default Map;
