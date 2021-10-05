import { gql } from '@apollo/client';


export const CREATE_USER = gql`
    mutation CreateUser($userId: String!, $username: String!, $fullname: String, $email: String!, $bio: String!, $avatar: String!, $website: String!) {
        insert_users(objects: {user_id: $userId, username: $username, fullname: $fullname, email: $email, bio: $bio, avatar: $avatar, website: $website}) {
            affected_rows
        }
    }
`;