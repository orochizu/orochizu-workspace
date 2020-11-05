import React from 'react';
import { Divider, Grid, Box, Typography } from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

import SidebarFooterButton from './SidebarFooterButton';
import SidebarFooterText from './SidebarFooterText';

function SidebarFooter(): JSX.Element {
  return (
    <Grid container item justify="center" alignContent="flex-end" xs={12}>
      <SidebarFooterButton href={process.env.NX_PUBLIC_LINKED_IN_URL}>
        <LinkedInIcon />
      </SidebarFooterButton>
      <SidebarFooterButton href={process.env.NX_PUBLIC_GITHUB_URL}>
        <GitHubIcon />
      </SidebarFooterButton>
      <SidebarFooterButton href={process.env.NX_PUBLIC_FACEBOOK_URL}>
        <FacebookIcon />
      </SidebarFooterButton>
      <SidebarFooterText />
    </Grid>
  );
}

export default SidebarFooter;
