'use client';

import clsx from 'clsx';
import { forwardRef, useState } from 'react';

import { Icon } from '../common/icon/Icon';
import { Text } from '../common/text/Text';
import { CommonProps } from '../common/types';
import { Palette } from '../style/color/sprinkles.css';

import { buttonRecipe, ButtonVariants } from './style.css';

interface ButtonProps extends CommonProps, NonNullable<ButtonVariants> {
  icon?: string;
  iconColor?: Palette;
  leftSubText?: string | number;
  leftSubTextColor?: Palette;
  rightSubText?: string | number;
  rightSubTextColor?: Palette;
  isLoading?: boolean;
  loadingSpinner?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const textColorMap: Record<
  string,
  Record<string, { textColor: Palette; hovertextColor: Palette }>
> = {
  primary: {
    fill: { textColor: 'white', hovertextColor: 'white' },
    outline: { textColor: 'uiPrimaryNormal', hovertextColor: 'blue700' },
  },
  secondary: {
    fill: { textColor: 'white', hovertextColor: 'white' },
    outline: { textColor: 'textNormal', hovertextColor: 'textNormal' },
  },
  tertiary: {
    fill: { textColor: 'blueGray500', hovertextColor: 'blueGray500' },
    outline: { textColor: 'blueGray500', hovertextColor: 'blueGray500' },
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size,
      variant = 'primary',
      design = 'fill',
      icon,
      iconColor,
      leftSubText,
      leftSubTextColor,
      rightSubText,
      rightSubTextColor,
      isLoading = false,
      loadingSpinner = 'refresh',
      disabled = false,
      type = 'button',
      className,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const buttonClass = buttonRecipe({
      size,
      variant,
      design,
    });

    const { textColor, hovertextColor } = textColorMap[variant][design] || {
      textColor: 'uiPrimaryNormal',
      hovertextColor: 'uiPrimaryNormal',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(buttonClass, className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ ...props.style }}
        disabled={disabled}
        {...props}
      >
        {icon && (
          <Icon color={iconColor || (isHovered && !disabled ? hovertextColor : textColor)}>
            {icon}
          </Icon>
        )}
        {leftSubText && (
          <Text
            textType={size === 's' ? 'body2' : 'body1'}
            style={{
              color: leftSubTextColor || (isHovered && !disabled ? hovertextColor : textColor),
            }}
          >
            {leftSubText}
          </Text>
        )}
        {children && (
          <Text
            textType={size === 's' ? 'body2' : 'body1'}
            textMode="bold"
            color={isHovered && !disabled ? hovertextColor : textColor}
          >
            {children}
          </Text>
        )}
        {rightSubText && (
          <Text
            textType={size === 's' ? 'body2' : 'body1'}
            style={{
              color: rightSubTextColor || (isHovered && !disabled ? hovertextColor : textColor),
            }}
            color={rightSubTextColor}
          >
            {rightSubText}
          </Text>
        )}
        {isLoading && (
          <Icon color={iconColor || (isHovered && !disabled ? hovertextColor : textColor)}>
            {loadingSpinner}
          </Icon>
        )}
      </button>
    );
  }
);
