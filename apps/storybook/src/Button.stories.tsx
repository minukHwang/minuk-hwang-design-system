import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@minuk-hwang-design-system/components-react/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
    },
    design: {
      control: { type: 'select' },
      options: ['fill', 'outline'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'primary',
    design: 'outline',
    children: 'Outline Button',
  },
};

export const Small: Story = {
  args: {
    size: 's',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'm',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'l',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
