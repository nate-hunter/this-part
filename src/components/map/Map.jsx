import { Circle } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { format } from 'timeago.js';

import './map.css';
import Layout from '../shared/Layout';
import MapIcon from './MapIcon';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../../graphql/queries';
import Context from '../../context';
import axios from 'axios';
import { CREATE_POST } from '../../graphql/mutations';


const INITIAL_VIEWPORT = {
    // NYC:
    latitude: 40.730824,
    longitude: -73.997330,
    zoom: 12
}

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Map = () => {
    const { currentUserId } = useContext(Context);
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    // const [userPosition, setUserPosition] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPost, setNewPost] = useState(null);
    const [newPostImage, setNewPostImage] = useState(null);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostLocation, setNewPostLocation] = useState('');
    const [newPostDescr, setNewPostDescr] = useState('');

    const { data, loading, error } = useQuery(GET_ALL_POSTS);
    const [CreatePost] = useMutation(CREATE_POST);



    useEffect(() => {
        try {
            if (!loading) setPosts(data.posts);
        } catch (error) {
            console.error('Error getting posts\n', error)
        }

    }, [loading])

    if (loading) return <h3>Map is loading...</h3>; // Use a LoadingPage here
    if (error) return <h3>There is an error loading the map...</h3>


    const handleAddNewPostClick = ({ lngLat, leftButton }) => {
        const [lon, lat] = lngLat;
        if (!leftButton) return;

        setNewPost({
            lat,
            lon
        });
        console.log('map clicked', leftButton, lon, lat)
    }

    const handleMarkerClick = ({ id, lat, lon }) => {
        setCurrentPlaceId(id);
        setViewport({ ...viewport, latitude: lat, longitude: lon })

    }

    const handleImageUpload = async () => {
        const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/pandaboogie/image/upload'

        const data = new FormData();
        data.append('file', newPostImage)
        data.append('upload_preset', 'this-part');
        data.append('cloud_name', 'pandaboogie');

        const resp = await axios.post(cloudinaryUrl, data);
        // console.log('form data:', data, '\ncloudinary response:', newPostImage)
        return resp.data.url
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const imgUrl = await handleImageUpload();

        const variables = {
            img: imgUrl,  // this will be a url
            lat: newPost.lat,
            lon: newPost.lon,
            title: newPostTitle,
            area: newPostLocation,
            content: newPostDescr,
            userId: currentUserId
        }

        await CreatePost({ variables });
        setNewPost(null)

        console.log('form submitted:', variables)
    }

    // console.log('new post:', newPost)

    return (
        <div className="map">

            <ReactMapGL
                width="100vw"
                // width="100%"
                height="100vh"
                mapStyle="mapbox://styles/mapbox/light-v10"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
                onViewportChange={newViewport => setViewport(newViewport)}
                onDblClick={handleAddNewPostClick}
                doubleClickZoom={false}
                transitionDuration={1000}
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
                        {/* {console.log('post:', post.user)} */}
                        <Marker
                            key={post.id}
                            latitude={post.lat}
                            longitude={post.lon}
                        >
                            <MapIcon
                                onClick={() => handleMarkerClick(post)}
                                color={currentUserId === post.user.id ? 'lightseagreen' : 'slateblue'}
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
                                {/* <label>Title</label> */}
                                <h1 className="popup-item-title">{post.title}</h1>
                                {/* <br /> */}
                                <img className="popup-img" src={post.img} alt="post" />
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

                {newPost && (
                    <>
                        <Marker
                            // key={post.id}
                            latitude={newPost.lat}
                            longitude={newPost.lon}
                        >
                            <MapIcon
                                // onClick={() => handleMarkerClick(post)}
                                color={'lightseagreen'}
                                size={15}
                            />
                        </Marker>
                        <Popup
                            anchor="bottom"
                            latitude={newPost.lat}
                            longitude={newPost.lon}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setNewPost(null)}
                        >
                            <div className='form-container'>
                                <form onSubmit={handleSubmit} className="new-post-form">
                                    <input
                                        accept='image/*'
                                        id='image'
                                        type="file"
                                        name="img"
                                        onChange={(e => setNewPostImage(e.target.files[0]))}
                                    />
                                    <label>
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter a title for the art piece..."
                                        autoFocus
                                        onChange={e => setNewPostTitle(e.target.value)}
                                    />
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        placeholder="Where is this art piece located (e.g., neighborhood)"
                                        autoFocus
                                        onChange={e => setNewPostLocation(e.target.value)}
                                    />
                                    <label>Description</label>
                                    <textarea
                                        placeholder="Enter a description of the art piece..."
                                        onChange={e => setNewPostDescr(e.target.value)}
                                    />
                                    <button type="submit" className="add-post-btn">
                                        Add Post
                                    </button>
                                </form>
                            </div>
                        </Popup>
                    </>
                )}



            </ReactMapGL>
        </div>
    )
}

export default Map;
