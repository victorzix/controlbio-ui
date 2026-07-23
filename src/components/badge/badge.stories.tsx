import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    appearance: {
      control: "select",
      options: ["soft", "solid", "outline"],
    },
    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "danger", "info"],
    },
    shape: {
      control: "select",
      options: ["pill", "rounded"],
    },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Badge" },
};

/* ----------------------------- Tons (soft) ----------------------------- */

export const Success: Story = {
  args: { tone: "success", children: "Vigente" },
};

export const Warning: Story = {
  args: { tone: "warning", children: "A vencer" },
};

export const Danger: Story = {
  args: { tone: "danger", children: "Vencido" },
};

export const Neutral: Story = {
  args: { tone: "neutral", children: "Desconhecido" },
};

/* ------------------------------ Formas ------------------------------ */

export const Tag: Story = {
  name: "Tag (rounded)",
  args: { tone: "success", shape: "rounded", children: "INMETRO" },
};

/* ------------------------------ Matriz ------------------------------ */

const TONES = ["neutral", "primary", "success", "warning", "danger", "info"] as const;
const APPEARANCES = ["soft", "solid", "outline"] as const;

export const Matrix: Story = {
  name: "Matriz appearance × tone",
  render: () => (
    <table className="border-separate border-spacing-3 text-sm">
      <thead>
        <tr>
          <th className="text-left font-medium text-muted-foreground" />
          {TONES.map((t) => (
            <th key={t} className="text-left font-medium capitalize text-muted-foreground">
              {t}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {APPEARANCES.map((a) => (
          <tr key={a}>
            <td className="pr-2 font-medium capitalize text-muted-foreground">{a}</td>
            {TONES.map((t) => (
              <td key={t}>
                <Badge appearance={a} tone={t}>
                  Label
                </Badge>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const Shapes: Story = {
  name: "Formas",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge tone="success" shape="pill">pill</Badge>
      <Badge tone="success" shape="rounded">rounded (tag)</Badge>
    </div>
  ),
};
