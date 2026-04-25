import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    minRows: { control: "number" },
    maxRows: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: "Descrição",
    placeholder: "Digite uma descrição...",
  },
};

export const WithHint: Story = {
  name: "Com hint",
  args: {
    label: "Observações",
    placeholder: "Adicione observações relevantes...",
    hint: "Essas informações são visíveis apenas internamente.",
  },
};

export const WithError: Story = {
  name: "Com erro",
  args: {
    label: "Descrição",
    placeholder: "Digite uma descrição...",
    error: "Descrição é obrigatória.",
  },
};

export const WithMaxRows: Story = {
  name: "Com limite de linhas",
  args: {
    label: "Notas",
    placeholder: "Máximo 6 linhas...",
    minRows: 3,
    maxRows: 6,
    hint: "Cresce até 6 linhas e então habilita scroll.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Campo desabilitado",
    disabled: true,
    defaultValue: "Conteúdo não editável.",
  },
};
