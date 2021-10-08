import { gql } from '@apollo/client';

export const GET_USER_EMAIL = gql`
    query GetUserEmail ($username: String!) {
        users(where: {username: {_eq: $username}}) {
            email
        }
    }
`;

export const GET_ALL_POSTS = gql`
    query GetAllPosts {
        posts {
            area
            content
            created_at
            id
            img
            lat
            lon
            title
            user {
                avatar
                username
            }
        }
    }
`;