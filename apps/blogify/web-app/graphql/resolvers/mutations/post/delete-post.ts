import { Post } from '@prisma/client';
import { ServerContext } from '@orochizu-workspace/types';
import { withAuth } from '@orochizu-workspace/data-access/graphql/auth';

interface Args {
  id: number;
}

const deletePost = async (
  _,
  { id }: Args,
  ctx: ServerContext
): Promise<Post> => {
  return await ctx.prisma.post.delete({ where: { id } });
};

export default withAuth(deletePost);
