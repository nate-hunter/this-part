import React from 'react';
import SEO from './Seo';
import TopBar from './TopBar';
import Footer from './Footer';

/*
 This component: 
 - contains the shared header 
 - "wraps" the contents of our not found page
*/

const Layout = ({ children, title }) => {
    return (
        <section>
            <SEO title={title} />
            <TopBar />
            <>
                {children}
            </>

            {/* Styling of the footer needs to be improved before displaying
              **  e.g., positioning + responsiveness */}
            {/* <Footer /> */}

        </section>
    )
}

export default Layout;
