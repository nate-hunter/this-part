import { gql } from '@apollo/client';


export const ME = gql`
    subscription Me($userId: String) {
        users(where: {user_id: {_eq: $userId }}){
            id
            user_id
            fullname
            username
            avatar
            created_at
            last_checked

        }
    }
`;

/* export const ME = gql`
    subscription me($userId: String) {
        users(where: {user_id: {_eq: $userId }}){
            id
            user_id
            name
            username
            profile_image
            created_at
            last_checked
            followers {
                user {
                    id
                    user_id
                }
            }
            following {
                user {
                    id
                    user_id
                }
            }
            notifications(order_by: { created_at: desc }) {
                id
                type
                created_at
                post {
                    id
                    media
                }
                user {
                    id
                    username
                    profile_image
                }
            }
        }
    }`;
*/