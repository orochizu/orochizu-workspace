import { gql } from 'apollo-server-micro';

const postType = gql`
  type Post {
    id: ID!
    createdAt: String
    updatedAt: String
    url: String
    author: String
    title: String
    content: String
    description: String
  }

  input CreatePostInput {
    url: String
    author: String
    title: String
    content: String
    description: String
  }

  input UpdatePostInput {
    url: String
    author: String
    title: String
    content: String
    description: String
  }

  input FilterPostInput {
    author: String
    title: String
    description: String
  }

  extend type Query {
    postById(id: ID!): Post
    postByUrl(url: String!): Post
    posts(input: FilterPostInput!, from: Int = 0, to: Int = 5): [Post]!
  }

  extend type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Post!
  }
`;

export default postType;
