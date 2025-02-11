'use client';

import React, { useMemo } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';
import { cssInterop } from 'nativewind';
import { Svg } from 'react-native-svg';

import { createInput } from '@gluestack-ui/input';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { withStates } from '@gluestack-ui/nativewind-utils/withStates';
import {
  useStyleContext,
  withStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext';
import { withStyleContextAndStates } from '@gluestack-ui/nativewind-utils/withStyleContextAndStates';

const SCOPE = 'INPUT';

type IPrimitiveIcon = {
  height?: number | string;
  width?: number | string;
  fill?: string;
  color?: string;
  size?: number | string;
  stroke?: string;
  as?: React.ElementType;
  className?: string;
};

const PrimitiveIcon = React.forwardRef<
  React.ElementRef<typeof Svg>,
  IPrimitiveIcon
>(({ height, width, fill, color, size, stroke, as: AsComp, ...props }, ref) => {
  const sizeProps = useMemo(() => {
    if (size) return { size };
    if (height && width) return { height, width };
    if (height) return { height };
    if (width) return { width };
    return {};
  }, [size, height, width]);

  let colorProps = {};
  if (color) {
    colorProps = { ...colorProps, color };
  }
  if (stroke) {
    colorProps = { ...colorProps, stroke };
  }
  if (fill) {
    colorProps = { ...colorProps, fill };
  }
  if (AsComp) {
    return <AsComp ref={ref} {...sizeProps} {...colorProps} {...props} />;
  }
  return (
    <Svg ref={ref} height={height} width={width} {...colorProps} {...props} />
  );
});

const InputWrapper = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentProps<typeof View>
>(({ ...props }, ref) => {
  return <View {...props} ref={ref} />;
});

const UIInput = createInput({
  // @ts-ignore
  Root:
    Platform.OS === 'web'
      ? withStyleContext(InputWrapper, SCOPE)
      : withStyleContextAndStates(InputWrapper, SCOPE),
  Icon: PrimitiveIcon,
  Slot: Pressable,
  Input: Platform.OS === 'web' ? TextInput : withStates(TextInput),
});

const inputStyle = tva({
  base: 'flex-row content-center items-center overflow-hidden border-background-300 data-[focus=true]:border-primary-700 data-[focus=true]:hover:border-primary-700 data-[hover=true]:border-outline-400 data-[disabled=true]:opacity-40 data-[disabled=true]:hover:border-background-300',

  variants: {
    size: {
      xl: 'h-12',
      lg: 'h-11',
      md: 'h-10',
      sm: 'h-9',
    },

    variant: {
      underlined:
        'rounded-none border-b data-[invalid=true]:border-b-2 data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700',

      outline:
        'data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-indicator-error data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-indicator-error data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-indicator-error rounded border data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700',

      rounded:
        'data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-indicator-error data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-indicator-error data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-indicator-error rounded-full border data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700',
    },
  },
});

const inputIconStyle = tva({
  base: 'items-center justify-center fill-none text-typography-400',
  parentVariants: {
    size: {
      '2xs': 'h-3 w-3',
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
});

const inputSlotStyle = tva({
  base: 'web:disabled:cursor-not-allowed items-center justify-center',
});

const inputFieldStyle = tva({
  base: 'py-auto ios:leading-[0px] web:cursor-text web:data-[disabled=true]:cursor-not-allowed h-full flex-1 px-3 text-typography-900 placeholder:text-typography-500',

  parentVariants: {
    variant: {
      underlined: 'web:outline-0 web:outline-none px-0',
      outline: 'web:outline-0 web:outline-none',
      rounded: 'web:outline-0 web:outline-none px-4',
    },

    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
  },
});

cssInterop(InputWrapper, { className: 'style' });
cssInterop(UIInput.Slot, { className: 'style' });
cssInterop(UIInput.Input, {
  className: { target: 'style', nativeStyleToProp: { textAlign: true } },
});
cssInterop(UIInput.Icon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      // @ts-ignore
      fill: true,
      color: true,
      stroke: true,
    },
  },
});

type IInputProps = React.ComponentProps<typeof UIInput> &
  VariantProps<typeof inputStyle> & { className?: string };
const Input = React.forwardRef<React.ElementRef<typeof UIInput>, IInputProps>(
  ({ className, variant = 'outline', size = 'md', ...props }, ref) => {
    return (
      <UIInput
        ref={ref}
        {...props}
        className={inputStyle({ variant, size, class: className })}
        context={{ variant, size }}
      />
    );
  },
);

type IInputIconProps = React.ComponentProps<typeof UIInput.Icon> & {
  className?: string;
};

const InputIcon = React.forwardRef<
  React.ElementRef<typeof UIInput.Icon>,
  IInputIconProps
>(({ className, size, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE);

  if (typeof size === 'number') {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({ class: className })}
        size={size}
      />
    );
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({ class: className })}
      />
    );
  }
  return (
    <UIInput.Icon
      ref={ref}
      {...props}
      className={inputIconStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
    />
  );
});

type IInputSlotProps = React.ComponentProps<typeof UIInput.Slot> &
  VariantProps<typeof inputSlotStyle> & { className?: string };

const InputSlot = React.forwardRef<
  React.ElementRef<typeof UIInput.Slot>,
  IInputSlotProps
>(({ className, ...props }, ref) => {
  return (
    <UIInput.Slot
      ref={ref}
      {...props}
      className={inputSlotStyle({
        class: className,
      })}
    />
  );
});

type IInputFieldProps = React.ComponentProps<typeof UIInput.Input> &
  VariantProps<typeof inputFieldStyle> & { className?: string };

const InputField = React.forwardRef<
  React.ElementRef<typeof UIInput.Input>,
  IInputFieldProps
>(({ className, ...props }, ref) => {
  const { variant: parentVariant, size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIInput.Input
      ref={ref}
      {...props}
      className={inputFieldStyle({
        parentVariants: {
          variant: parentVariant,
          size: parentSize,
        },
        class: className,
      })}
    />
  );
});

Input.displayName = 'Input';
InputIcon.displayName = 'InputIcon';
InputSlot.displayName = 'InputSlot';
InputField.displayName = 'InputField';

export { Input, InputField, InputIcon, InputSlot };
