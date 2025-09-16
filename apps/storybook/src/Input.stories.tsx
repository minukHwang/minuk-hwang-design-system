import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@minuk-hwang-design-system/components-react/input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'highlight', 'warning', 'disabled', 'readonly'],
    },
    placeholder: {
      control: 'text',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
    showIcon: {
      control: 'boolean',
    },
    showButton: {
      control: 'boolean',
    },
    showPasswordToggle: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: 'default',
    placeholder: 'Enter text here',
  },
};

export const WithValue: Story = {
  args: {
    state: 'default',
    value: 'Entered text',
    placeholder: 'Enter text here',
  },
};

export const Highlight: Story = {
  args: {
    state: 'highlight',
    placeholder: 'Highlighted input',
  },
};

export const Warning: Story = {
  args: {
    state: 'warning',
    placeholder: 'Warning state input',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    placeholder: 'Disabled input',
  },
};

export const ReadOnly: Story = {
  args: {
    state: 'readonly',
    value: 'Read-only text',
    placeholder: 'Read-only input',
  },
};

export const Password: Story = {
  args: {
    state: 'default',
    type: 'password',
    placeholder: 'Enter password',
    showPasswordToggle: true,
  },
};

export const NoIcon: Story = {
  args: {
    state: 'default',
    placeholder: 'Input without icon',
    showIcon: false,
  },
};
