import React from 'react';
import { Box, Divider, Grid } from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

import SidebarFooterButton from './SidebarFooterButton';
import SidebarFooterText from './SidebarFooterText';
import SidebarAuth from './SidebarAuth';
import firebase from 'firebase';

interface Props {
  user: firebase.User;
  onSignIn: () => void;
  onSingOut: () => void;
}

function SidebarFooter({ user, onSignIn, onSingOut }: Props): JSX.Element {
  return (
    <Grid container item justify="center" alignContent="flex-end" xs={12}>
      <Grid container item>
        <SidebarAuth user={user} onSignIn={onSignIn} onSingOut={onSingOut} />
      </Grid>
      <Grid item xs={12}>
        <Box pt={1} pb={1}>
          <Divider />
        </Box>
      </Grid>
      <SidebarFooterButton href={process.env.NX_PUBLIC_LINKED_IN_URL}>
        <LinkedInIcon />
      </SidebarFooterButton>
      <SidebarFooterButton href={process.env.NX_PUBLIC_GITHUB_URL}>
        <GitHubIcon />
      </SidebarFooterButton>
      <SidebarFooterButton href={process.env.NX_PUBLIC_FACEBOOK_URL}>
        <FacebookIcon />
      </SidebarFooterButton>
      <Grid item xs={12}>
        <Box pt={1} pb={1}>
          <Divider />
        </Box>
      </Grid>
      <SidebarFooterText />
    </Grid>
  );
}

export default SidebarFooter;
