import React from 'react';
import { Moon, Sun } from 'lucide-react-native';
import { useStore } from '@/store';

import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export function ThemeToggle() {
  const theme = useStore(state => state.theme);
  const toggleTheme = useStore(state => state.toggleTheme);

  return (
    <Button variant="outline" onPress={toggleTheme} size="sm" action="primary">
      <ButtonIcon as={theme === 'dark' ? Sun : Moon} size="sm" />
      <ButtonText size="sm">
        {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </ButtonText>
    </Button>
  );
}
