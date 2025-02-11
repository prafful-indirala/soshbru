import React from 'react';

import { Box } from '@/ui/box';
import { ChevronLeftIcon, Icon } from '@/ui/icon';
import { Pressable } from '@/ui/pressable';

const BackBtn = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={navigation.goBack}>
      <Box className="rounded-[20px] p-[2px] opacity-70">
        <Icon as={ChevronLeftIcon} className="m-2 h-4 w-4" />
      </Box>
    </Pressable>
  );
};

export default BackBtn;
