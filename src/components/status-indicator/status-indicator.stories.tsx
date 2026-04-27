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
      description: "Define a cor do indicador.",
    },
    pulse: {
      control: "boolean",
      description: "Define se o efeito de pulso (ping) está ativo.",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof StatusIndicator> = {
  args: {
    variant: "success",
    pulse: true,
  },
  render: (args) => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <StatusIndicator {...args} />
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          {args.variant} (Controllable)
        </span>
      </div>
      
      <div className="flex flex-col gap-4 border-l pl-8">
        <div className="flex items-center gap-2">
          <StatusIndicator variant="neutral" pulse={false} />
          <span className="text-sm">Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator variant="success" pulse={false} />
          <span className="text-sm">Success</span>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator variant="warning" pulse={false} />
          <span className="text-sm">Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator variant="destructive" pulse={false} />
          <span className="text-sm">Destructive</span>
        </div>
      </div>
    </div>
  ),
};

export const InContext: StoryObj<typeof StatusIndicator> = {
  args: {
    variant: "success",
    pulse: true,
  },
  render: (args) => (
    <div className="flex items-center gap-3 p-4 border rounded-lg max-w-sm bg-card shadow-sm">
      <StatusIndicator {...args} />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">Status do Sistema</span>
        <span className="text-xs text-muted-foreground">Última atualização: há 2 minutos</span>
      </div>
    </div>
  ),
};
