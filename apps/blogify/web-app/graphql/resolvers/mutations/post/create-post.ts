import { Post, PostCreateInput } from '@prisma/client';
import { ServerContext } from '@orochizu-workspace/types';
import { withAuth } from '@orochizu-workspace/data-access/graphql/auth';
import { ApolloError } from '@apollo/client';

interface Args {
  input: PostCreateInput;
}

const createPost = async (_, args: Args, ctx: ServerContext): Promise<Post> => {
  try {
    return await ctx.prisma.post.create({ data: args.input });
  } catch (e) {
    throw new ApolloError({ errorMessage: 'Cannot create new post' });
  }
};

export default withAuth(createPost);
