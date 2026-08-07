import { BorderVariants, BorderSprinkles } from '@minuk-hwang-design-system/styles/border';
import { ColorSprinkles } from '@minuk-hwang-design-system/styles/color';
import { LayoutSprinkles } from '@minuk-hwang-design-system/styles/layout';
import { ShadowSprinkles } from '@minuk-hwang-design-system/styles/shadow';
import { SpacingSprinkles } from '@minuk-hwang-design-system/styles/spacing';
import { TypographyVariants } from '@minuk-hwang-design-system/styles/typography';
import { ElementType } from 'react';

export type AsProps = {
  as?: ElementType;
};

export interface CommonProps
  extends AsProps,
    Omit<LayoutSprinkles, 'width' | 'height'>,
    SpacingSprinkles,
    ColorSprinkles,
    TypographyVariants,
    BorderSprinkles,
    BorderVariants,
    ShadowSprinkles,
    Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  children?: React.ReactNode;
  width?: number | LayoutSprinkles['width'];
  height?: number | LayoutSprinkles['height'];
  className?: string;
}
