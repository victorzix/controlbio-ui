import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { RichTextEditor } from "./rich-text-editor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
  args: {
    onChange: fn(),
  },
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    value: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
  args: {
    label: "Descrição",
    hint: "Suporta formatação rica.",
  },
};

export const WithInitialContent: Story = {
  name: "Com conteúdo inicial",
  args: {
    label: "Observações",
    value: "<h2>Título de exemplo</h2><p>Este é um parágrafo com <strong>negrito</strong>, <em>itálico</em> e <s>tachado</s>.</p><ul><li>Item um</li><li>Item dois</li></ul><blockquote>Uma citação relevante.</blockquote>",
  },
};

export const WithError: Story = {
  name: "Com erro",
  args: {
    label: "Conteúdo",
    error: "Campo obrigatório.",
  },
};

export const Required: Story = {
  name: "Obrigatório",
  args: {
    label: "Descrição do produto",
    required: true,
    hint: "Descreva detalhadamente o produto.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Conteúdo somente leitura",
    disabled: true,
    value: "<p>Este conteúdo não pode ser editado.</p>",
  },
};
