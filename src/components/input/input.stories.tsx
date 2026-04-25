import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "Nome", placeholder: "Digite seu nome" },
};

export const WithHint: Story = {
  name: "Com hint",
  args: {
    label: "Email",
    placeholder: "email@exemplo.com",
    hint: "Usaremos apenas para comunicações importantes.",
  },
};

export const WithError: Story = {
  name: "Com erro",
  args: {
    label: "Email",
    placeholder: "email@exemplo.com",
    error: "Email inválido.",
    defaultValue: "nao-e-um-email",
  },
};

export const Required: Story = {
  name: "Obrigatório",
  args: {
    label: "Nome completo",
    placeholder: "Digite seu nome",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Campo desabilitado",
    placeholder: "Não editável",
    disabled: true,
    defaultValue: "Valor fixo",
  },
};

export const WithLeftIcon: Story = {
  name: "Com ícone à esquerda",
  args: {
    label: "Busca",
    placeholder: "Buscar...",
    leftElement: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  name: "Com ícone à direita",
  args: {
    label: "Email",
    placeholder: "email@exemplo.com",
    rightElement: <MailIcon />,
  },
};

export const Password: Story = {
  name: "Senha",
  args: {
    label: "Senha",
    type: "password",
    placeholder: "••••••••",
    rightElement: <EyeIcon />,
    hint: "Mínimo 8 caracteres.",
  },
};

export const AllStates: Story = {
  name: "Todos os estados",
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Input label="Normal" placeholder="Placeholder" />
      <Input label="Com hint" placeholder="Placeholder" hint="Texto de ajuda." />
      <Input label="Com erro" placeholder="Placeholder" error="Mensagem de erro." defaultValue="valor inválido" />
      <Input label="Desabilitado" placeholder="Placeholder" disabled defaultValue="Desabilitado" />
      <Input label="Com ícone" placeholder="Buscar..." leftElement={<SearchIcon />} />
    </div>
  ),
};
