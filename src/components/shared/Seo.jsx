import React from 'react';
import { Helmet } from 'react-helmet';

// Add keywords +/or metadata?

const SEO = ({ title }) => {

    title = title ? `${title} | this pArt` : 'this pArt';

    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default SEO;
