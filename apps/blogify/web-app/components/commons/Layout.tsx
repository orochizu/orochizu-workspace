import React from 'react';
import { PropsWithChildren } from 'react';

import { Sidebar } from '@orochizu-workspace/ui/components';
import { Box, Container } from '@material-ui/core';


function Layout(props: PropsWithChildren<unknown>): JSX.Element {
  const { children } = props;
  return (
    <Box display="flex">
      <Sidebar paths={[]} />
      <Container>{children}</Container>
    </Box>
  );
}

export default Layout;
