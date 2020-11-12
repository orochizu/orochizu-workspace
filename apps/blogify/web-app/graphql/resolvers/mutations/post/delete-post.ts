import { Post } from '@prisma/client';
import { ServerContext } from '@orochizu-workspace/types';
import { withAuth } from '@orochizu-workspace/data-access/graphql/auth';
import { ApolloError } from '@apollo/client';

interface Args {
  id: number;
}

const deletePost = async (
  _,
  { id }: Args,
  ctx: ServerContext
): Promise<Post> => {
  try {
    return await ctx.prisma.post.delete({ where: { id: Number(id) } });
  } catch (e) {
    throw new ApolloError({ errorMessage: 'Cannot delete post' });
  }
};

export default withAuth(deletePost);
