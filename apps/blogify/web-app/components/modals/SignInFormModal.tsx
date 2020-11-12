import React from 'react';

import {
  Theme,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useForm } from 'react-hook-form';
import { useReactiveVar } from '@apollo/client';

import { useFirebase } from '@orochizu-workspace/data-access/firebase/client';
import { FormTextField } from '@orochizu-workspace/ui/components';

import { isSignInModalOpen } from '../../graphql/client/cache';

interface SignInFormType {
  email: string;
  password: string;
}

const defaultValues: SignInFormType = {
  email: '',
  password: '',
};

const useStyles = makeStyles(() => ({
  field: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  button: {
    margin: '0 8px',
  },
}));

function SignInFormModal(): JSX.Element {
  const styles = useStyles();
  const fullScreen = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down('sm')
  );
  const { auth } = useFirebase();
  const isOpen = useReactiveVar(isSignInModalOpen);

  const handleClose = (): void => {
    isSignInModalOpen(false);
  };

  const { handleSubmit: submit, control, errors, formState } = useForm<
    SignInFormType
  >({
    mode: 'onBlur',
    defaultValues,
  });

  const handleSubmit = async (form: SignInFormType): Promise<void> => {
    try {
      await auth().signInWithEmailAndPassword(form.email, form.password);
      const token = await auth().currentUser.getIdToken(true);

      localStorage.setItem('token', token);
      handleClose();
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle disableTypography>
        <Typography variant="h5">Sign In with your credentials</Typography>
      </DialogTitle>
      <form onSubmit={submit(handleSubmit)}>
        <DialogContent dividers>
          <Typography variant="subtitle1">
            This section is only for administrators to manage content of
            application.
          </Typography>
          <Grid container>
            <FormTextField
              id="email-input"
              name="email"
              type="email"
              label="Enter your email address"
              className={styles.field}
              control={control}
              hasError={!!errors.email}
              size={12}
              isRequired
            />
            <FormTextField
              id="password-input"
              name="password"
              type="password"
              label="Enter your password"
              className={styles.field}
              control={control}
              hasError={!!errors.password}
              size={12}
              isRequired
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                variant="text"
                color="secondary"
                className={styles.button}
                onClick={handleClose}
              >
                Close
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={styles.button}
                disabled={!formState.isValid}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SignInFormModal;
