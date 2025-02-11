import React from 'react';

import { Box } from '@/ui/box';
import { Spinner } from '@/ui/spinner';

const Loading = () => {
  return (
    <Box className="items-center justify-center">
      <Spinner />
    </Box>
  );
};

export default Loading;
