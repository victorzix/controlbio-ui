import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchInput } from "./search-input";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    disabled: { control: "boolean" },
  },
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: "Buscar por razão social, CNPJ...",
  },
};

export const WithLabel: Story = {
  name: "Com label",
  args: {
    label: "Buscar cliente",
    placeholder: "Buscar por razão social, CNPJ...",
  },
};

export const Controlled: Story = {
  name: "Controlado (estado no chamador)",
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="flex max-w-sm flex-col gap-2">
        <SearchInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">Valor: {value || "—"}</p>
      </div>
    );
  },
  args: { placeholder: "Digite para buscar..." },
};

export const Disabled: Story = {
  args: { placeholder: "Busca indisponível", disabled: true },
};
