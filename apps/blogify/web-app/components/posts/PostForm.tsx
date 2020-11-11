import React from 'react';
import dynamic from 'next/dynamic';
import { Controller, useForm } from 'react-hook-form';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { FormTextField } from '@orochizu-workspace/ui/components';
import { useMutation } from '@apollo/client';
import {
  UPLOAD_FILE,
  UploadFile,
} from '../../graphql/client/mutations/upload-file';

import MarkdownIt from 'markdown-it';
import {
  CREATE_POST,
  CreatePost,
} from '../../graphql/client/mutations/create-post';

const mdParser = new MarkdownIt();

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

interface CreatePostFormType {
  url: string;
  author: string;
  title: string;
  content: string;
  description: string;
}

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

function PostForm() {
  const styles = useStyles();

  const { handleSubmit: submit, control, errors, formState } = useForm<
    CreatePostFormType
  >({
    mode: 'onBlur',
  });

  const [uploadFile, { loading: isFileUploadInProgress }] = useMutation<
    UploadFile
  >(UPLOAD_FILE);

  const [createPost, { loading: isCreatePostInProgress }] = useMutation<
    CreatePost
  >(CREATE_POST);

  const handleImageUpload = async (file: File) => {
    try {
      const { data } = await uploadFile({ variables: { file } });

      return data.uploadFile.url;
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSubmit = async (input: CreatePostFormType): Promise<void> => {
    try {
      await createPost({ variables: { input } });
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
          className={styles.field}
          control={control}
          hasError={!!errors.url}
          size={12}
          isRequired
        />
        <Controller
          id="post-content"
          name="content"
          defaultValue=""
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
              isCreatePostInProgress
            }
          >
            Create post
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default PostForm;
