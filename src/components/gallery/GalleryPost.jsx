import './gallery.css';

const GalleryPost = ({ post }) => {

    return (
        <div className='galleryItem'>
            <img src={post.img} alt='Post content' className='image' />
        </div>
    )
}

export default GalleryPost;
