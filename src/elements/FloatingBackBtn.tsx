import React from 'react';

import { Box } from '@/ui/box';
import { Center } from '@/ui/center';
import { ChevronLeftIcon } from '@/ui/icon';
import { Pressable } from '@/ui/pressable';

const FloatingBackBtn = () => {
  const navigation = useNavigation();

  return (
    <Center className="z-99999 absolute left-5 top-10">
      <Pressable onPress={navigation.goBack}>
        <Box className="rounded-[20px] bg-[#9ca3af] p-[2px] opacity-70">
          <ChevronLeftIcon size="sm" className="text-[#000000]" />
        </Box>
      </Pressable>
    </Center>
  );
};

export default FloatingBackBtn;
