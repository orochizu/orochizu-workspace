import { IResolvers } from 'graphql-tools';
import createPost from './create-post';
import updatePost from './update-post';
import deletePost from './delete-post';

const postMutations: IResolvers = {
  Mutation: {
    createPost,
    updatePost,
    deletePost,
  },
};

export default postMutations;
