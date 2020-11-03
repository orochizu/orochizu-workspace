import React from 'react';
import { PropsWithChildren } from 'react';

import { Sidebar } from '@orochizu-workspace/ui/components';
import { Box, Container } from '@material-ui/core';

interface Props {}

function Layout(props: PropsWithChildren<Props>) {
  const { children } = props;
  return (
    <Box display="flex">
      <Sidebar />
      <Container>{children}</Container>
    </Box>
  );
}

export default Layout;
