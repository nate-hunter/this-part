import { gql } from '@apollo/client';


export const CREATE_USER = gql`
    mutation CreateUser($userId: String!, $username: String!, $fullname: String, $email: String!, $bio: String!, $avatar: String!, $website: String!) {
        insert_users(objects: {user_id: $userId, username: $username, fullname: $fullname, email: $email, bio: $bio, avatar: $avatar, website: $website}) {
            affected_rows
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost ($img: String!, $lat: numeric!, $lon: numeric!, $title: String!, $area: String, $content: String!, $userId: uuid!) {
        insert_posts(objects: {img: $img, lat: $lat, lon: $lon, title: $title, area: $area, content: $content, user_id: $userId}) {
            returning {
                area
                content
                created_at
                id
                img
                lat
                lon
                updated_at
                user_id
                title
            }
        }
    }
`;

/*
 * Example CreatePost variables:
{
  "userId": "10800c16-3da0-4fbc-a49f-0231376dcebe",
  "lat": 40.730813922823586,
  "lon": -73.99745783667278,
  "title": "Obama in the Garden",
  "area": "Not In Public",
  "content": "Pretty cool mural by where panda use to work",
  "img": "https://res.cloudinary.com/pandaboogie/image/upload/v1620789657/p2rn09w9zqzyamriuro0.jpg"
}
*/