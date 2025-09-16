import { ElementType } from 'react';

import { BorderVariants } from '../style/border/recipes.css';
import { BorderSprinkles } from '../style/border/sprinkles.css';
import { ColorSprinkles } from '../style/color/sprinkles.css';
import { LayoutSprinkles } from '../style/layout/sprinkles.css';
import { ShadowSprinkles } from '../style/shadow/sprinkles.css';
import { SpacingSprinkles } from '../style/spacing/sprinkles.css';
import { TypographyVariants } from '../style/typography/recipes.css';

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
