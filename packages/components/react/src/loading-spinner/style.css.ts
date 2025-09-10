import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@minuk-hwang-design-system/style-tokens';

const rotateAnimation = keyframes({
  '100%': { transform: 'rotate(1turn)' },
});

export const loader = style({
  width: '50px',
  aspectRatio: '1',
  borderRadius: '50%',
  background: `
    radial-gradient(farthest-side, ${vars.color.$palette.ui.primaryNormal} 94%, transparent) top/8px 8px no-repeat,
    conic-gradient(transparent 30%, ${vars.color.$palette.ui.primaryNormal})
  `,
  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)',
  animation: `${rotateAnimation} 1s infinite linear`,
});
