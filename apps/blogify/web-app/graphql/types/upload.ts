import { gql } from 'apollo-server-micro';

const uploadType = gql`
  type UploadFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  extend type Mutation {
    uploadFile(file: Upload!): UploadFileResponse!
  }
`;

export default uploadType;
