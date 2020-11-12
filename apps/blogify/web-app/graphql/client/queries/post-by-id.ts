import { gql } from '@apollo/client';
import { QueriedPost } from '@orochizu-workspace/types';

export interface PostById {
  postById: QueriedPost;
}

export const POST_BY_ID = gql`
  query PostById($id: ID!) {
    postById(id: $id) {
      id
      url
      title
      author
      content
      description
    }
  }
`;
