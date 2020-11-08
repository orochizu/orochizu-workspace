import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';

import { FormTextField } from '@orochizu-workspace/ui/components';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/styles';
import { useFirebase } from '@orochizu-workspace/data-access/firebase/client';
import { useReactiveVar } from '@apollo/client';
import { isSignInModalOpen } from '../../graphql/client/cache';

interface SignInForm {
  email: string;
  password: string;
}

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

  const { auth } = useFirebase();
  const isOpen = useReactiveVar(isSignInModalOpen);

  const handleClose = (): void => {
    isSignInModalOpen(false);
  };

  const { handleSubmit: submit, control, errors, formState } = useForm<
    SignInForm
  >({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleSubmit = async (form: SignInForm): Promise<void> => {
    try {
      await auth().signInWithEmailAndPassword(form.email, form.password);
      const token = await auth().currentUser.getIdToken(true);

      localStorage.setItem('token', token);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle disableTypography>
        <Typography variant="h5">Sign In with your credentials</Typography>
      </DialogTitle>
      <form onSubmit={submit(handleSubmit)}>
        <DialogContent dividers>
          <Grid container>
            <FormTextField
              id="email-input"
              name="email"
              type="email"
              label="Enter your email address"
              defaultValue=""
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
              defaultValue=""
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