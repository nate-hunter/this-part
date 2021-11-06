import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../../graphql/queries';
import './gridGallery.css';
import { defaultPublicArtUrls } from '../../data/data';
import GridGalleryPost from './GridGalleryPost';


const GridGallery = () => {
    const { data, loading, error } = useQuery(GET_ALL_POSTS);
    // I'm thinking of making a specific query for the Gallery...

    if (loading) return <h3>Gallery loading...</h3>
    if (error) return <h3 style={{ color: 'red' }}>Error: {error}</h3>

    console.log('data:', data)


    // const displayPhotos = defaultPublicArtUrls.map(obj => {
    //     // const displayPhotos = data.posts.map(obj => {
    //     return (
    //         <div className="gallery-card" style={{ backgroundImage: `url(${obj.img})` }}>
    //             <span className="card-title">{obj.title}</span>
    //         </div>
    //     )
    // });

    const displayPhotos = defaultPublicArtUrls.map(post => (
        <GridGalleryPost key={post.id} post={post} />
    )
    );

    return (
        <>
            <main>
                <h2>Photo Gallery</h2>
                <div className="photo-grid">
                    {displayPhotos}
                </div>
            </main>
        </>
    )
}

export default GridGallery;

/*
 * What's to happen on this page:
 * A user will see a grid of photos...
 * When the user hovers over a photo, it'll transform slightly and the photo's title will appear...
 * The user can click on it to enlarge it and as a modal the photo will appear as a post (similar to Instagram?)...
 * The post will contain information about the photo as well as the option to view it on the map...
 * The user can be directed to the photo's location on the map or exit out of the modal.
 */
