import React, { useContext } from 'react';
import { UserContext } from '../App';
import Layout from '../components/shared/Layout';
import Context from '../context';

const Profile = () => {
    const { me, currentUserId } = useContext(Context);
    return (
        <Layout>
            <h2>Profile Page...</h2>
            User: {currentUserId}
        </Layout>
    )
}

export default Profile;
