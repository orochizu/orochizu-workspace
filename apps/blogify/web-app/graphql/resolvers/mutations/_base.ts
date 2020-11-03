import { IResolvers } from 'graphql-tools';

const baseMutation: IResolvers = {
  Mutation: {
    _: () => true,
  },
};

export default baseMutation;
