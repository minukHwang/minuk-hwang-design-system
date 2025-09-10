import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';

const layoutProperties = defineProperties({
  properties: {
    display: ['none', 'flex', 'block', 'inline', 'inline-block'],
    flexDirection: ['row', 'column'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    width: ['100%', '100vw', '100dvw'],
    height: ['100%', '100vh', '100dvh'],
  },
});

export const layoutSprinkles = createSprinkles(layoutProperties);

export type LayoutSprinkles = Parameters<typeof layoutSprinkles>[0];
