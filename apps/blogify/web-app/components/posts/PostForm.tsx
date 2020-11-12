import React from 'react';
import dynamic from 'next/dynamic';
import { Controller, useForm } from 'react-hook-form';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useMutation } from '@apollo/client';

import MarkdownIt from 'markdown-it';

import { FormTextField } from '@orochizu-workspace/ui/components';
import { CreatePostInput, QueriedPost } from '@orochizu-workspace/types';

import {
  UPLOAD_FILE,
  UploadFile,
  UploadFileVariables,
} from '../../graphql/client/mutations/upload-file';
import {
  CREATE_POST,
  CreatePost,
  CreatePostVariables,
} from '../../graphql/client/mutations/create-post';
import {
  UPDATE_POST,
  UpdatePost,
  UpdatePostVariables,
} from '../../graphql/client/mutations/update-post';

const mdParser = new MarkdownIt();

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const defaultValues: CreatePostInput = {
  url: '',
  author: '',
  title: '',
  content: '',
  description: '',
};

const useStyles = makeStyles(() => ({
  field: {
    padding: 8,
  },
  button: {
    margin: '0 8px',
  },
  buttons: {
    marginTop: 16,
  },
}));

interface Props {
  post?: QueriedPost;
}

function PostForm(props: Props) {
  const { post } = props;
  const styles = useStyles();

  const isUpdateMode = !!(post && post.id);

  const { handleSubmit: submit, control, errors, formState } = useForm<
    CreatePostInput
  >({
    mode: 'onBlur',
    defaultValues: post ?? defaultValues,
  });

  const [uploadFile, { loading: isFileUploadInProgress }] = useMutation<
    UploadFile,
    UploadFileVariables
  >(UPLOAD_FILE);

  const [createPost, { loading: isCreatePostInProgress }] = useMutation<
    CreatePost,
    CreatePostVariables
  >(CREATE_POST);

  const [updatePost, { loading: isUpdatePostInProgress }] = useMutation<
    UpdatePost,
    UpdatePostVariables
  >(UPDATE_POST);

  const handleImageUpload = async (file: File) => {
    try {
      const { data } = await uploadFile({ variables: { file } });

      return data.uploadFile.url;
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSubmit = async (input: CreatePostInput): Promise<void> => {
    try {
      if (isUpdateMode) {
        await updatePost({ variables: { id: post.id, input } });
      } else {
        await createPost({ variables: { input } });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <form onSubmit={submit(handleSubmit)}>
      <Grid container>
        <FormTextField
          id="post-url"
          name="url"
          type="text"
          label="Enter URL that will be used to access post"
          className={styles.field}
          control={control}
          hasError={!!errors.url}
          size={12}
          isRequired
        />
        <FormTextField
          id="post-author"
          name="author"
          type="text"
          label="Enter author name"
          className={styles.field}
          control={control}
          hasError={!!errors.url}
          size={6}
          isRequired
        />
        <FormTextField
          id="post-title"
          name="title"
          type="text"
          label="Enter post title"
          className={styles.field}
          control={control}
          hasError={!!errors.url}
          size={6}
          isRequired
        />
        <FormTextField
          id="post-description"
          name="description"
          type="text"
          label="Enter post description"
          className={styles.field}
          control={control}
          hasError={!!errors.url}
          size={12}
          isRequired
        />
        <Controller
          id="post-content"
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ name, value, onChange, onBlur }) => (
            <MdEditor
              name={name}
              value={value}
              style={{ height: '50vh', width: '100%', margin: 8 }}
              renderHTML={(text) => mdParser.render(text)}
              onImageUpload={handleImageUpload}
              onChange={({ text }) => onChange(text)}
              onBlur={onBlur}
            />
          )}
        />
      </Grid>
      <Grid container justify="flex-end" className={styles.buttons}>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.button}
            disabled={
              !formState.isValid ||
              isFileUploadInProgress ||
              isCreatePostInProgress ||
              isUpdatePostInProgress
            }
          >
            {isUpdateMode ? 'Update post' : 'Create post'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default PostForm;
