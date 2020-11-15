import { GetServerSideProps } from 'next';
import React from 'react';
import PostForm from '../../../../components/posts/PostForm';
import { authorized } from '@orochizu-workspace/data-access/firebase/server';

function AddPost() {
  return <PostForm />;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps = authorized();

export default AddPost;
