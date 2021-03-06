import { gql } from '@apollo/client';
import { MutatedPost, CreatePostInput } from '@orochizu-workspace/types';

export interface CreatePost {
  createPost: MutatedPost;
}

export interface CreatePostVariables {
  input: CreatePostInput;
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
