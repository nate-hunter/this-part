import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_POSTS } from '../../graphql/queries';

import './gallery.css'

const Gallery = () => {
    const { data, loading, error } = useQuery(GET_ALL_POSTS);
    // I'm thinking of making a specific query for the Gallery...

    const showPosts = data.posts.map(post => {
        return (
            <div>
                <img style={{ maxHeight: 100 }} src={post.img} alt="post-img" />
            </div>
        )
    })
    return (
        <div>
            {showPosts}
        </div>
    )
}

export default Gallery;
