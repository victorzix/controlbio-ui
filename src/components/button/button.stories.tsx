import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./button";

// Ícones inline simples para demo (sem dependência de lib externa)
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    disabled: { control: "boolean" },
    isLoading: { control: "boolean" },
    loadingText: { control: "text" },
    children: { control: "text" },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Confirmar" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Cancelar" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ver mais" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Editar" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Excluir" },
};

export const Link: Story = {
  args: { variant: "link", children: "Saiba mais" },
};

export const Disabled: Story = {
  args: { variant: "primary", children: "Indisponível", disabled: true },
};

export const Loading: Story = {
  args: { variant: "primary", isLoading: true },
};

export const LoadingCustomText: Story = {
  name: "Loading (texto customizado)",
  args: { variant: "primary", isLoading: true, loadingText: "Salvando..." },
};

export const WithLeftIcon: Story = {
  name: "Com ícone à esquerda",
  args: {
    variant: "primary",
    children: "Adicionar",
    leftIcon: <PlusIcon />,
  },
};

export const WithRightIcon: Story = {
  name: "Com ícone à direita",
  args: {
    variant: "outline",
    children: "Próximo",
    rightIcon: <ArrowRightIcon />,
  },
};

export const IconOnly: Story = {
  name: "Só ícone",
  args: {
    variant: "ghost",
    size: "icon",
    "aria-label": "Excluir",
    children: <TrashIcon />,
  },
};

export const AllVariants: Story = {
  name: "Todas as variantes",
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="destructive">Destructive</Button>
      <Button {...args} variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "Todos os tamanhos",
  render: (args) => (
    <div className="flex items-center flex-wrap gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
      <Button {...args} size="icon" aria-label="Adicionar"><PlusIcon /></Button>
    </div>
  ),
};
