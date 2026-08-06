import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

export const activeTab = style({
  position: 'relative',
  '::after': {
    content: "''",
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: vars.spacing[2],
    backgroundColor: vars.color.$palette.text.normal,
    borderTopLeftRadius: vars.borderRadius[4],
    borderTopRightRadius: vars.borderRadius[4],
    transform: 'scaleX(1)',
    transformOrigin: 'left',
    transition: 'transform 0.5s ease',
  },
});
