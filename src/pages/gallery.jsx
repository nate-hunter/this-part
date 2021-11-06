import Gallery from '../components/gallery/Gallery';
import GridGallery from '../components/gallery/GridGallery';
import Layout from '../components/shared/Layout';

const gallery = () => {
    return (
        <Layout title="Gallery">
            {/* <Gallery /> */}
            <GridGallery />
        </Layout>
    )
}

export default gallery;

// return (
//     <Layout title="Gallery">
//         <div style={{
//             display: 'flex',
//             flexFlow: 'column',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             background: 'salmon',
//             height: '100vh',
//         }}>

//             <h2>Gallery</h2>
//             <Gallery />
//         </div>
//     </Layout>
// )
