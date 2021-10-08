import { Circle } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import { format } from 'timeago.js';

import './map.css';
import Layout from '../shared/Layout';
import MapIcon from './MapIcon';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../../graphql/queries';
import Context from '../../context';


const INITIAL_VIEWPORT = {
    // NYC:
    latitude: 40.730824,
    longitude: -73.997330,
    zoom: 12
}


const Map = () => {
    const { currentUserId } = useContext(Context);
    console.log(currentUserId);
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    // const [userPosition, setUserPosition] = useState(null);
    // const [popup, setPopup] = useState(null);
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
    if (error) return <h3>There is an error loading the map...</h3>


    const handleMapClick = ({ lngLat, leftButton }) => {
        console.log('map clicked', leftButton, lngLat)
    }

    const handleMarkerClick = ({ id, lat, lon }) => {
        setCurrentPlaceId(id);
        setViewport({ ...viewport, latitude: lat, longitude: lon })
        console.log('marker clicked', id, lat, lon)

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
                        {console.log('post:', post.user)}
                        <Marker
                            key={post.id}
                            latitude={post.lat}
                            longitude={post.lon}

                        >
                            <MapIcon
                                onClick={() => handleMarkerClick(post)}
                                color={currentUserId === post.user.id ? 'slateblue' : 'lightseagreen'}
                                size={15}
                            />
                        </Marker>

                        {post.id === currentPlaceId && (<Popup
                            anchor="right"
                            latitude={post.lat}
                            longitude={post.lon}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setCurrentPlaceId(null)}
                        >
                            <div className="popup-card">
                                {/* <img src="" alt="" /> */}
                                <label>Title</label>
                                <h4 className="popup-item">{post.title}</h4>
                                <label>Location</label>
                                <h4 className="popup-item">{post.area}</h4>
                                <label>Description</label>
                                <p className="popup-descr">{post.content}</p>
                                <span className="username">Created by <b>{post.user.username}</b></span>
                                <span className="date-created">{format(post.created_at)}</span>
                            </div>

                        </Popup>)}
                    </>
                ))}



            </ReactMapGL>
        </>
    )
}

export default Map;
