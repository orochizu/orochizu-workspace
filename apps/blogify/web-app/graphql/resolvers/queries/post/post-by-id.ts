import { Post } from '@prisma/client';
import { ServerContext } from '@orochizu-workspace/types';
import { UserInputError } from 'apollo-server-micro';

interface Args {
  id: number;
}

const postById = async (_, { id }: Args, ctx: ServerContext): Promise<Post> => {
  try {
    return await ctx.prisma.post.findOne({ where: { id: Number(id) } });
  } catch (e) {
    throw new UserInputError('Not found');
  }
};

export default postById;
