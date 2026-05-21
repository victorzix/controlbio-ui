import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SituationSwitch } from "./situation-switch";

const meta: Meta<typeof SituationSwitch> = {
  title: "Components/SituationSwitch",
  component: SituationSwitch,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    isPending: { control: "boolean" },
    activeLabel: { control: "text" },
    inactiveLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SituationSwitch>;

export const Active: Story = {
  name: "Ativo",
  args: {
    checked: true,
    onCheckedChange: () => {},
  },
};

export const Inactive: Story = {
  name: "Inativo",
  args: {
    checked: false,
    onCheckedChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    onCheckedChange: () => {},
    disabled: true,
  },
};

export const Pending: Story = {
  name: "Pendente (mutação)",
  args: {
    checked: true,
    onCheckedChange: () => {},
    isPending: true,
  },
};

export const CustomLabels: Story = {
  name: "Labels customizados",
  args: {
    checked: true,
    onCheckedChange: () => {},
    activeLabel: "Publicado",
    inactiveLabel: "Rascunho",
  },
};

export const Controlled: Story = {
  name: "Controlado",
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <div className="flex flex-col gap-3">
        <SituationSwitch checked={checked} onCheckedChange={setChecked} />
        <p className="text-sm text-muted-foreground">
          Estado: <strong>{checked ? "Ativo" : "Inativo"}</strong>
        </p>
      </div>
    );
  },
};

export const InTable: Story = {
  name: "Em contexto de tabela",
  render: () => {
    const [rows, setRows] = useState([
      { id: 1, name: "Usuário Admin", active: true },
      { id: 2, name: "Usuário Operador", active: false },
      { id: 3, name: "Usuário Visualizador", active: true },
    ]);

    const toggle = (id: number) =>
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
      );

    return (
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th className="py-2 pr-4 font-medium">Nome</th>
            <th className="py-2 font-medium">Situação</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border">
              <td className="py-2.5 pr-4 text-foreground">{row.name}</td>
              <td className="py-2.5">
                <SituationSwitch
                  checked={row.active}
                  onCheckedChange={() => toggle(row.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};