import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../../graphql/queries';
import './gridGallery.css';
import { defaultPublicArtUrls } from '../../data/data';


const GridGallery = () => {
    const { data, loading, error } = useQuery(GET_ALL_POSTS);
    // I'm thinking of making a specific query for the Gallery...

    if (loading) return <h3>Gallery loading...</h3>
    if (error) return <h3 style={{ color: 'red' }}>Error: {error}</h3>


    const displayPhotos = defaultPublicArtUrls.map(obj => {
        return (
            <div className="gallery-card" style={{ backgroundImage: `url(${obj.img})` }}>
                {obj.title}
            </div>
        )
    });

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
