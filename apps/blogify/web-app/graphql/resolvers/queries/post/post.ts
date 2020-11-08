import { Post } from '@prisma/client';
import { ServerContext } from '@orochizu-workspace/types';
import { UserInputError } from 'apollo-server-micro';

interface Args {
  url: string;
}

const post = async (_, { url }: Args, ctx: ServerContext): Promise<Post> => {
  try {
    return await ctx.prisma.post.findOne({ where: { url } });
  } catch (e) {
    throw new UserInputError('Not found');
  }
};

export default post;
