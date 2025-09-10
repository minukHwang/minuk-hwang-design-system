import { style } from '@vanilla-extract/css';
import { vars } from '@minuk-hwang-design-system/style-tokens';

export const activeTab = style({
  position: 'relative',
  '::after': {
    content: "''",
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: vars.spacing.spacing[2],
    backgroundColor: vars.color.$palette.text.normal,
    borderTopLeftRadius: vars.radius.borderRadius.s,
    borderTopRightRadius: vars.radius.borderRadius.s,
    transform: 'scaleX(1)',
    transformOrigin: 'left',
    transition: 'transform 0.5s ease',
  },
});
