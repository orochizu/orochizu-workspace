import { IResolvers } from 'graphql-tools';

const baseQuery: IResolvers = {
  Query: {
    _: () => {
      return true;
    },
  },
};

export default baseQuery;
