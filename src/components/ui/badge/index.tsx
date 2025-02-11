'use client';

import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { cssInterop } from 'nativewind';
import { Svg } from 'react-native-svg';

import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import {
  useStyleContext,
  withStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext';

const SCOPE = 'BADGE';

const badgeStyle = tva({
  base: 'flex-row items-center rounded-sm px-2 py-1 data-[disabled=true]:opacity-50',
  variants: {
    action: {
      error: 'border-error-300 bg-background-error',
      warning: 'border-warning-300 bg-background-warning',
      success: 'border-success-300 bg-background-success',
      info: 'border-info-300 bg-background-info',
      muted: 'border-background-300 bg-background-muted',
    },
    variant: {
      solid: '',
      outline: 'border',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
});

const badgeTextStyle = tva({
  base: 'font-body font-normal uppercase tracking-normal text-typography-700',

  parentVariants: {
    action: {
      error: 'text-error-600',
      warning: 'text-warning-600',
      success: 'text-success-600',
      info: 'text-info-600',
      muted: 'text-secondary-600',
    },
    size: {
      sm: 'text-2xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
  },
  variants: {
    isTruncated: {
      true: 'web:truncate',
    },
    bold: {
      true: 'font-bold',
    },
    underline: {
      true: 'underline',
    },
    strikeThrough: {
      true: 'line-through',
    },
    sub: {
      true: 'text-xs',
    },
    italic: {
      true: 'italic',
    },
    highlight: {
      true: 'bg-yellow-500',
    },
  },
});

const badgeIconStyle = tva({
  base: 'fill-none',
  parentVariants: {
    action: {
      error: 'text-error-600',
      warning: 'text-warning-600',
      success: 'text-success-600',
      info: 'text-info-600',
      muted: 'text-secondary-600',
    },
    size: {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    },
  },
});

type IPrimitiveIcon = React.ComponentPropsWithoutRef<typeof Svg> & {
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

const ContextView = withStyleContext(View, SCOPE);
cssInterop(ContextView, { className: 'style' });
cssInterop(PrimitiveIcon, {
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

type IBadgeProps = React.ComponentPropsWithoutRef<typeof ContextView> &
  VariantProps<typeof badgeStyle>;
const Badge = ({
  children,
  action = 'info',
  variant = 'solid',
  size = 'md',
  className,
  ...props
}: { className?: string } & IBadgeProps) => {
  return (
    <ContextView
      className={badgeStyle({ action, variant, class: className })}
      {...props}
      context={{
        action,
        variant,
        size,
      }}
    >
      {children}
    </ContextView>
  );
};

type IBadgeTextProps = React.ComponentPropsWithoutRef<typeof Text> &
  VariantProps<typeof badgeTextStyle>;

const BadgeText = React.forwardRef<
  React.ElementRef<typeof Text>,
  IBadgeTextProps
>(({ children, className, size, ...props }, ref) => {
  const { size: parentSize, action: parentAction } = useStyleContext(SCOPE);
  return (
    <Text
      ref={ref}
      className={badgeTextStyle({
        parentVariants: {
          size: parentSize,
          action: parentAction,
        },
        size,
        class: className,
      })}
      {...props}
    >
      {children}
    </Text>
  );
});

type IBadgeIconProps = React.ComponentPropsWithoutRef<typeof PrimitiveIcon> &
  VariantProps<typeof badgeIconStyle>;

const BadgeIcon = React.forwardRef<
  React.ElementRef<typeof PrimitiveIcon>,
  IBadgeIconProps
>(({ className, size, ...props }, ref) => {
  const { size: parentSize, action: parentAction } = useStyleContext(SCOPE);

  if (typeof size === 'number') {
    return (
      <PrimitiveIcon
        ref={ref}
        {...props}
        className={badgeIconStyle({ class: className })}
        size={size}
      />
    );
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <PrimitiveIcon
        ref={ref}
        {...props}
        className={badgeIconStyle({ class: className })}
      />
    );
  }
  return (
    <PrimitiveIcon
      className={badgeIconStyle({
        parentVariants: {
          size: parentSize,
          action: parentAction,
        },
        size,
        class: className,
      })}
      {...props}
      ref={ref}
    />
  );
});

Badge.displayName = 'Badge';
BadgeText.displayName = 'BadgeText';
BadgeIcon.displayName = 'BadgeIcon';

export { Badge, BadgeIcon, BadgeText };
