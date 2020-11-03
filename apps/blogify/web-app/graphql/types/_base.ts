import { gql } from 'apollo-server-micro';

const baseType = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default baseType;
