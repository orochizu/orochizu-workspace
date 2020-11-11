import React from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import cn from 'classnames';

import { FormTextField } from '@orochizu-workspace/ui/components';

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

function CreatePostForm() {
  const styles = useStyles();

  const { handleSubmit: submit, control, errors, formState } = useForm<
    CreatePostFormType
  >({
    mode: 'onBlur',
  });

  const handleSubmit = async (form: CreatePostFormType): Promise<void> => {
    try {
      console.log(form);
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
        <MdEditor
          id="post-content"
          name="content"
          style={{ height: '50vh', width: '100%', margin: 8 }}
          onImageUpload={async (file: File) => {}}
        />
      </Grid>
      <Grid container justify="flex-end" className={styles.buttons}>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.button}
            disabled={!formState.isValid}
          >
            Create post
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CreatePostForm;
