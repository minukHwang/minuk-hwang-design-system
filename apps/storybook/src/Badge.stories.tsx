import { Badge } from '@minuk-hwang-design-system/components-react/badge';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['blue', 'pink', 'orange', 'green', 'white', 'ghost', 'ghostWhite'],
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    color: 'blue',
    children: 'Blue Badge',
  },
};

export const Pink: Story = {
  args: {
    color: 'pink',
    children: 'Pink Badge',
  },
};

export const Orange: Story = {
  args: {
    color: 'orange',
    children: 'Orange Badge',
  },
};

export const Green: Story = {
  args: {
    color: 'green',
    children: 'Green Badge',
  },
};

export const White: Story = {
  args: {
    color: 'white',
    children: 'White Badge',
  },
};

export const Ghost: Story = {
  args: {
    color: 'ghost',
    children: 'Ghost Badge',
  },
};

export const Small: Story = {
  args: {
    size: 's',
    children: 'Small',
  },
};

export const Medium: Story = {
  args: {
    size: 'm',
    children: 'Medium',
  },
};

export const Large: Story = {
  args: {
    size: 'l',
    children: 'Large',
  },
};
