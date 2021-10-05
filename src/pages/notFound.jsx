import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/shared/Layout'

const notFound = () => {
    return (
        <Layout title='Page Not Found'>
            <h2>Page not found.</h2>

            <Link to='/' className='link'>
                <button>Return home</button>
            </Link>
        </Layout>
    )
}

export default notFound
