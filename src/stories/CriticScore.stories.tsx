import CriticScore from "@components/CriticScore";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CriticScore> = {
  component: CriticScore,
};

export default meta;
type Story = StoryObj<typeof CriticScore>;

export const Above75Percent: Story = {
  args: {
    score: 80,
  },
  argTypes: {
    score: {
      control: { type: "range", min: 1, max: 100, step: 1 },
    },
  },
};

export const Above60Percent: Story = {
  args: {
    score: 65,
  },
};

export const Above30Percent: Story = {
  args: {
    score: 35,
  },
};

export const Above0Percent: Story = {
  args: {
    score: 25,
  },
};
