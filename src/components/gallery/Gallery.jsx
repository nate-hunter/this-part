import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_POSTS } from '../../graphql/queries';

import './gallery.css'
import GalleryPost from './GalleryPost';

const Gallery = () => {
    const { data, loading, error } = useQuery(GET_ALL_POSTS);
    // I'm thinking of making a specific query for the Gallery...

    if (loading) return <h3>Gallery loading...</h3>


    const galleryPosts = data.posts.map(post => (
        <GalleryPost key={post.id} post={post} />
    ));

    return (
        <div className='gallery'>
            <div className="postContainer">
                {galleryPosts}
            </div>
        </div>
    )
}

export default Gallery;
