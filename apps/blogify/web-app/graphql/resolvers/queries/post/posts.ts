import { Post, PostWhereInput } from '@prisma/client';
import { ServerContext } from '@orochizu-workspace/types';
import { ApolloError } from '@apollo/client';

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
  try {
    return await ctx.prisma.post.findMany({
      where: input,
      take: to,
      skip: from,
    });
  } catch (e) {
    throw new ApolloError({ errorMessage: 'Cannot find posts' });
  }
};

export default posts;
