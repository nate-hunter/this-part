import { gql } from '@apollo/client';

export const GET_USER_EMAIL = gql`
    query GetUserEmail ($username: String!) {
        users(where: {username: {_eq: $username}}) {
            email
        }
    }
`;