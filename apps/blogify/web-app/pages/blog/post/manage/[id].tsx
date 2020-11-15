import React from 'react';
import { GetServerSideProps } from 'next';

import { QueriedPost } from '@orochizu-workspace/types';
import { authorized } from '@orochizu-workspace/data-access/firebase/server';
import { initializeApollo } from '@orochizu-workspace/data-access/graphql/client';

import PostForm from '../../../../components/posts/PostForm';
import {
  POST_BY_ID,
  PostById,
} from '../../../../graphql/client/queries/post-by-id';

interface Props {
  post: QueriedPost;
}

function EditPost({ post }: Props) {
  return <PostForm post={post} />;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps = authorized(
  async (ctx) => {
    const client = initializeApollo();

    const post = await client.query<PostById>({
      query: POST_BY_ID,
      variables: { id: ctx.params.id },
    });

    return {
      props: {
        post: post.data.postById,
        initialApolloState: client.cache.extract(),
      },
    };
  }
);

export default EditPost;
