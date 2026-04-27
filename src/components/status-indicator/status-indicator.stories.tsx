import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { StatusIndicator } from "./status-indicator";

const meta: Meta<typeof StatusIndicator> = {
  title: "Components/StatusIndicator",
  component: StatusIndicator,
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "success", "warning", "destructive"],
    },
    pulse: {
      control: "boolean",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof StatusIndicator> = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <StatusIndicator {...args} variant="neutral" />
        <span className="text-xs text-muted-foreground">Neutral</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <StatusIndicator {...args} variant="success" />
        <span className="text-xs text-muted-foreground">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <StatusIndicator {...args} variant="warning" />
        <span className="text-xs text-muted-foreground">Warning</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <StatusIndicator {...args} variant="destructive" />
        <span className="text-xs text-muted-foreground">Destructive</span>
      </div>
    </div>
  ),
};

export const InContext: StoryObj<typeof StatusIndicator> = {
  render: () => (
    <div className="flex items-center gap-2 p-4 border rounded-lg max-w-sm">
      <StatusIndicator variant="success" />
      <span className="text-sm font-medium">Sistema Operacional</span>
    </div>
  ),
};
