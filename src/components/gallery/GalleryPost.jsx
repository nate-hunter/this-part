import React from 'react';

import './gallery.css';

const GalleryPost = ({ post }) => {

    return (
        <div className='galleryPostContainer'>

            <img src={post.img} alt='Post content' className='image' />
        </div>
    )
}

export default GalleryPost;
