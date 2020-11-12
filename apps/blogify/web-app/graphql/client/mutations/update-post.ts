import { gql } from '@apollo/client';
import { MutatedPost, CreatePostInput } from '@orochizu-workspace/types';

export interface UpdatePost {
  updatePost: MutatedPost;
}

export interface UpdatePostVariables {
  id: number;
  input: CreatePostInput;
}

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
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
