import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "./collapsible";
import { Checkbox } from "../checkbox/checkbox";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: { control: "boolean" },
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {
    title: "Permissões de Acesso",
    children: (
      <div className="flex flex-col gap-2">
        <Checkbox label="Leitura" checked />
        <Checkbox label="Escrita" />
        <Checkbox label="Exclusão" />
      </div>
    ),
  },
};

export const DefaultOpen: Story = {
  name: "Aberto por padrão",
  args: {
    title: "Permissões de Acesso",
    defaultOpen: true,
    children: (
      <div className="flex flex-col gap-2">
        <Checkbox label="Leitura" checked />
        <Checkbox label="Escrita" />
        <Checkbox label="Exclusão" />
      </div>
    ),
  },
};

export const WithBadgeTitle: Story = {
  name: "Título com badge",
  args: {
    title: (
      <span className="flex items-center gap-2">
        Localizações de Equipamentos
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          2/4
        </span>
      </span>
    ),
    defaultOpen: true,
    children: (
      <div className="flex flex-col gap-2">
        <Checkbox label="Almoxarifado" checked />
        <Checkbox label="Laboratório" checked />
        <Checkbox label="Recepção" />
        <Checkbox label="Sala de reuniões" />
      </div>
    ),
  },
};

export const Nested: Story = {
  name: "Aninhado",
  render: () => (
    <div className="flex flex-col gap-2 max-w-md">
      <Collapsible
        title={
          <span className="flex items-center gap-2">
            Usuários
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              3/6
            </span>
          </span>
        }
        defaultOpen
      >
        <div className="flex flex-col gap-2">
          <Checkbox label="Criar usuário" checked />
          <Checkbox label="Editar usuário" checked />
          <Checkbox label="Excluir usuário" checked />
          <Checkbox label="Visualizar usuário" />
          <Checkbox label="Exportar usuários" />
          <Checkbox label="Importar usuários" />
        </div>
      </Collapsible>
      <Collapsible
        title={
          <span className="flex items-center gap-2">
            Equipamentos
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              0/4
            </span>
          </span>
        }
      >
        <div className="flex flex-col gap-2">
          <Checkbox label="Criar equipamento" />
          <Checkbox label="Editar equipamento" />
          <Checkbox label="Excluir equipamento" />
          <Checkbox label="Visualizar equipamento" />
        </div>
      </Collapsible>
    </div>
  ),
};