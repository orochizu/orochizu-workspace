import { Post, PostCreateInput } from '@prisma/client';
import { ServerContext } from '@orochizu-workspace/types';
import { withAuth } from '@orochizu-workspace/data-access/graphql/auth';

interface Args {
  input: PostCreateInput;
}

const createPost = async (_, args: Args, ctx: ServerContext): Promise<Post> => {
  return await ctx.prisma.post.create({ data: args.input });
};

export default withAuth(createPost);
