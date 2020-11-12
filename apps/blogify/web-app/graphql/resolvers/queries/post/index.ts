import { IResolvers } from 'graphql-tools';
import postByUrl from './post-by-url';
import postById from './post-by-id';
import posts from './posts';

const postQueries: IResolvers = {
  Query: {
    postByUrl,
    postById,
    posts,
  },
};

export default postQueries;
