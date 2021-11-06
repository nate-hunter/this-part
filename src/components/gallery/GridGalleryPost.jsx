import './gridGallery.css';


const GridGalleryPost = ({ post }) => {
    const handleOpenPostModal = () => {
        console.log(`Post ${post.id} clicked`)
    }

    return (
        <div onClick={handleOpenPostModal} className="gallery-card" style={{ backgroundImage: `url(${post.img})` }}>
            <span className="card-title">{post.title}</span>
        </div>
    )
}

export default GridGalleryPost;
