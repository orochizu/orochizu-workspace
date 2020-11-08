import { Post, PostWhereInput } from '@prisma/client';
import { ServerContext } from '@orochizu-workspace/types';

interface Args {
  input: PostWhereInput;
  from: number;
  to: number;
}

const posts = async (
  _,
  { input, from, to }: Args,
  ctx: ServerContext
): Promise<Post[]> => {
  return await ctx.prisma.post.findMany({ where: input, take: to, skip: from });
};

export default posts;
