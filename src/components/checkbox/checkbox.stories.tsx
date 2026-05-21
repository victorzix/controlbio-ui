import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: "Aceitar termos de uso" },
};

export const Checked: Story = {
  args: { label: "Aceitar termos de uso", checked: true },
};

export const WithHint: Story = {
  name: "Com hint",
  args: {
    label: "Receber notificações",
    hint: "Enviaremos apenas avisos importantes.",
  },
};

export const WithError: Story = {
  name: "Com erro",
  args: {
    label: "Aceitar termos de uso",
    error: "Você precisa aceitar os termos para continuar.",
  },
};

export const Disabled: Story = {
  args: { label: "Opção desabilitada", disabled: true },
};

export const DisabledChecked: Story = {
  name: "Desabilitado e marcado",
  args: { label: "Opção desabilitada", disabled: true, checked: true },
};

export const Controlled: Story = {
  name: "Controlado",
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex flex-col gap-3">
        <Checkbox
          label="Habilitar funcionalidade"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p className="text-sm text-muted-foreground">
          Estado: <strong>{checked ? "marcado" : "desmarcado"}</strong>
        </p>
      </div>
    );
  },
};

export const Group: Story = {
  name: "Grupo de checkboxes",
  render: () => {
    const options = [
      { id: "read", label: "Leitura" },
      { id: "write", label: "Escrita" },
      { id: "delete", label: "Exclusão" },
    ];
    const [selected, setSelected] = useState<string[]>(["read"]);

    const toggle = (id: string) =>
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
      );

    return (
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <Checkbox
            key={opt.id}
            id={opt.id}
            label={opt.label}
            checked={selected.includes(opt.id)}
            onCheckedChange={() => toggle(opt.id)}
          />
        ))}
      </div>
    );
  },
};

export const AllStates: Story = {
  name: "Todos os estados",
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Desmarcado" />
      <Checkbox label="Marcado" checked />
      <Checkbox label="Com hint" hint="Texto de ajuda." />
      <Checkbox label="Com erro" error="Campo obrigatório." />
      <Checkbox label="Desabilitado" disabled />
      <Checkbox label="Desabilitado e marcado" disabled checked />
    </div>
  ),
};