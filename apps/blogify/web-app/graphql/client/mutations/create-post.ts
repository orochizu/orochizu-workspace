import { gql } from '@apollo/client';
import { CreatedPost } from '@orochizu-workspace/types';

export interface CreatePost {
  createPost: CreatedPost;
}

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      url
      createdAt
      updatedAt
      title
      author
      content
      description
    }
  }
`;
