import React from 'react';
import SEO from './Seo';
import TopBar from './topBar/TopBar';
import SideBar from './sideBar/SideBar';
import './layout.css'
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
            <SideBar />
            <main>
                {children}
            </main>
        </section>
    )
}

export default Layout;
