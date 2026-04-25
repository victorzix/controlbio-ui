import type { Meta, StoryObj } from "@storybook/react";
import { MaskedInput } from "./masked-input";

const meta: Meta<typeof MaskedInput> = {
  title: "Components/MaskedInput",
  component: MaskedInput,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof MaskedInput>;

export const Phone: Story = {
  name: "Telefone",
  args: {
    label: "Telefone",
    mask: "(00) 00000-0000",
    placeholder: "(00) 00000-0000",
    hint: "Apenas números.",
  },
};

export const CPF: Story = {
  args: {
    label: "CPF",
    mask: "000.000.000-00",
    placeholder: "000.000.000-00",
  },
};

export const CNPJ: Story = {
  args: {
    label: "CNPJ",
    mask: "00.000.000/0000-00",
    placeholder: "00.000.000/0000-00",
  },
};

export const CEP: Story = {
  args: {
    label: "CEP",
    mask: "00000-000",
    placeholder: "00000-000",
  },
};

export const Date: Story = {
  name: "Data",
  args: {
    label: "Data de nascimento",
    mask: "00/00/0000",
    placeholder: "DD/MM/AAAA",
  },
};

export const Currency: Story = {
  name: "Moeda",
  args: {
    label: "Valor",
    mask: Number,
    scale: 2,
    thousandsSeparator: ".",
    radix: ",",
    prefix: "R$ ",
    placeholder: "R$ 0,00",
    hint: "Somente valores positivos.",
  },
};

export const WithError: Story = {
  name: "Com erro",
  args: {
    label: "CPF",
    mask: "000.000.000-00",
    placeholder: "000.000.000-00",
    error: "CPF inválido.",
    defaultValue: "111",
  },
};
