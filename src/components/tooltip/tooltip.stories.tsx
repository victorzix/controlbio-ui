import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./tooltip";
import { Button } from "../button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
    side: { control: "select", options: ["top", "right", "bottom", "left"] },
    align: { control: "select", options: ["start", "center", "end"] },
    sideOffset: { control: "number" },
    delayDuration: { control: "number" },
    disabled: { control: "boolean" },
    children: { control: false },
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Validade: 01/01/2026",
    children: <Button variant="outline" tone="neutral">Passe o mouse</Button>,
  },
};

export const Sides: Story = {
  name: "Lados",
  render: () => (
    <div className="flex items-center gap-6">
      <Tooltip content="Top" side="top">
        <Button variant="outline" tone="neutral" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Right" side="right">
        <Button variant="outline" tone="neutral" size="sm">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom" side="bottom">
        <Button variant="outline" tone="neutral" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" side="left">
        <Button variant="outline" tone="neutral" size="sm">Left</Button>
      </Tooltip>
    </div>
  ),
};

export const OnIconButton: Story = {
  name: "Em botão de ícone",
  args: {
    content: "Excluir",
    children: (
      <Button variant="ghost" tone="destructive" size="icon-sm" aria-label="Excluir">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </Button>
    ),
  },
};

export const Disabled: Story = {
  name: "Desabilitado (sem tooltip)",
  args: {
    content: "Não aparece",
    disabled: true,
    children: <Button variant="outline" tone="neutral">Sem tooltip</Button>,
  },
};
