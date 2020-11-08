import { IResolvers } from 'graphql-tools';
import post from './post';
import posts from './posts';

const postQueries: IResolvers = {
  Query: {
    post,
    posts,
  },
};

export default postQueries;
