import React, { PropsWithChildren } from 'react';
import { capitalize } from 'lodash';
import { FieldError } from 'react-hook-form';

import { Box } from '@/ui/box';
import {
  FormControl,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/ui/form-control';
import { VStack } from '@/ui/vstack';

const defaultProps = {
  helperMsg: '',
  isRequired: false,
};

type Props = {
  label: string;
  type?: 'list' | 'grid';
  helperMsg?: string;
  isInvalid: FieldError | undefined;
  isRequired?: boolean;
} & PropsWithChildren &
  typeof defaultProps;

const MyFormControl = ({
  label,
  children,
  helperMsg,
  isInvalid,
  ...props
}: Props) => {
  return (
    <FormControl {...props}>
      <VStack>
        <FormControlLabel>
          <FormControlLabelText>{label} </FormControlLabelText>
        </FormControlLabel>
        {children}
        {isInvalid ? (
          <Box className="h-[18px]">
            <FormControlErrorText
              size="xs"
              className="leading-xs -mt-1 text-red-400"
            >
              {capitalize(isInvalid.message)}
            </FormControlErrorText>
          </Box>
        ) : (
          <FormControlHelper>
            <FormControlHelperText>{helperMsg}</FormControlHelperText>
          </FormControlHelper>
        )}
      </VStack>
    </FormControl>
  );
};

// MyFormControl.defaultProps = defaultProps;r

export default MyFormControl;
