import { style } from '@vanilla-extract/css';

export const ellipsisTextStyle = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
