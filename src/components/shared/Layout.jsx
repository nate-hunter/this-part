import React from 'react';
import SEO from './Seo';
import TopBar from './TopBar';

/*
 This component: 
 - contains the shared header 
 - "wraps" the contents of our not found page
*/

const Layout = ({ children, title }) => {
    // I need to better understand how 'children' components are handled;

    return (
        <section>
            <SEO title={title} />
            {/* Why is the SEO component here? */}

            <TopBar />

            <main>
                <section>
                    <div>
                        {children}
                    </div>
                </section>
            </main>
        </section>
    )
}

export default Layout;
