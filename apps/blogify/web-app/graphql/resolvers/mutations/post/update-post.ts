import { Post, PostUpdateInput } from '@prisma/client';
import { ServerContext } from '@orochizu-workspace/types';
import { withAuth } from '@orochizu-workspace/data-access/graphql/auth';

interface Args {
  id: number;
  input: PostUpdateInput;
}

const updatePost = async (
  _,
  { id, input }: Args,
  ctx: ServerContext
): Promise<Post> => {
  return await ctx.prisma.post.update({ data: input, where: { id } });
};

export default withAuth(updatePost);
