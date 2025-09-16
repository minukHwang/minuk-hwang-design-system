import { Text } from '@minuk-hwang-design-system/components-react/text';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    textType: {
      control: { type: 'select' },
      options: [
        'display1',
        'display2',
        'title1',
        'title2',
        'title3',
        'heading1',
        'heading2',
        'headline',
        'body1',
        'body2',
        'body3',
        'label',
        'footnote',
        'caption',
      ],
    },
    textMode: {
      control: { type: 'select' },
      options: ['default', 'reading', 'bold'],
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
    color: {
      control: { type: 'select' },
      options: ['textNormal', 'textAlternative', 'textStrong', 'uiPrimaryNormal', 'blue500'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display1: Story = {
  args: {
    textType: 'display1',
    children: 'Display 1 Text',
  },
};

export const Title1: Story = {
  args: {
    textType: 'title1',
    children: 'Title 1 Text',
  },
};

export const Heading1: Story = {
  args: {
    textType: 'heading1',
    children: 'Heading 1 Text',
  },
};

export const Body1: Story = {
  args: {
    textType: 'body1',
    children: 'Body 1 text for general content. This is the default text style.',
  },
};

export const Body2: Story = {
  args: {
    textType: 'body2',
    children: 'Body 2 text for smaller content. This is used for secondary text.',
  },
};

export const Caption: Story = {
  args: {
    textType: 'caption',
    children: 'Caption text for small descriptions and additional information.',
  },
};

export const BoldText: Story = {
  args: {
    textType: 'body1',
    textMode: 'bold',
    children: 'Bold text example',
  },
};
