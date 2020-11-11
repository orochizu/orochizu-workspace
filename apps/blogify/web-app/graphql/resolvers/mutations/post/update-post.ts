import { Post, PostUpdateInput } from '@prisma/client';
import { ServerContext } from '@orochizu-workspace/types';
import { withAuth } from '@orochizu-workspace/data-access/graphql/auth';
import { ApolloError } from '@apollo/client';

interface Args {
  id: number;
  input: PostUpdateInput;
}

const updatePost = async (
  _,
  { id, input }: Args,
  ctx: ServerContext
): Promise<Post> => {
  try {
    return await ctx.prisma.post.update({ data: input, where: { id } });
  } catch (e) {
    throw new ApolloError({ errorMessage: 'Cannot update post' });
  }
};

export default withAuth(updatePost);
