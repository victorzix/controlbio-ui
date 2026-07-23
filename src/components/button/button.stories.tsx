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

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
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
      options: ["solid", "outline", "ghost", "link"],
    },
    tone: {
      control: "select",
      options: ["neutral", "primary", "destructive"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "icon-xs", "icon-sm", "icon"],
    },
    fullWidth: { control: "boolean" },
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

/* ----------------------------- Básicos ----------------------------- */

export const Primary: Story = {
  args: { children: "Confirmar" },
};

export const Neutral: Story = {
  args: { tone: "neutral", children: "Cancelar" },
};

export const Destructive: Story = {
  args: { tone: "destructive", children: "Excluir" },
};

export const Outline: Story = {
  args: { variant: "outline", tone: "neutral", children: "Editar" },
};

export const Ghost: Story = {
  args: { variant: "ghost", tone: "neutral", children: "Ver mais" },
};

export const Link: Story = {
  args: { variant: "link", tone: "primary", children: "Saiba mais" },
};

export const Disabled: Story = {
  args: { children: "Indisponível", disabled: true },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const LoadingCustomText: Story = {
  name: "Loading (texto customizado)",
  args: { isLoading: true, loadingText: "Salvando..." },
};

export const FullWidth: Story = {
  name: "Largura total",
  args: { children: "Adicionar endereço", fullWidth: true, leftIcon: <PlusIcon /> },
  parameters: { layout: "padded" },
};

/* ----------------------------- Ícones ----------------------------- */

export const WithLeftIcon: Story = {
  name: "Com ícone à esquerda",
  args: { children: "Adicionar", leftIcon: <PlusIcon /> },
};

export const WithRightIcon: Story = {
  name: "Com ícone à direita",
  args: { variant: "outline", tone: "neutral", children: "Próximo", rightIcon: <ArrowRightIcon /> },
};

export const IconOnly: Story = {
  name: "Só ícone",
  args: {
    variant: "ghost",
    tone: "neutral",
    size: "icon-sm",
    "aria-label": "Excluir",
    children: <TrashIcon />,
  },
};

/* --------------------------- Matrizes --------------------------- */

export const ToneVariantMatrix: Story = {
  name: "Matriz tone × variant",
  render: (args) => {
    const variants = ["solid", "outline", "ghost", "link"] as const;
    const tones = ["neutral", "primary", "destructive"] as const;
    return (
      <table className="border-separate border-spacing-3 text-sm">
        <thead>
          <tr>
            <th className="text-left text-muted-foreground font-medium" />
            {tones.map((t) => (
              <th key={t} className="text-left text-muted-foreground font-medium capitalize">
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <tr key={v}>
              <td className="text-muted-foreground font-medium capitalize pr-2">{v}</td>
              {tones.map((t) => (
                <td key={t}>
                  <Button {...args} variant={v} tone={t}>
                    Ação
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};

export const AllSizes: Story = {
  name: "Todos os tamanhos",
  render: (args) => (
    <div className="flex items-center flex-wrap gap-3">
      <Button {...args} size="xs">Extra small</Button>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const AsChild: Story = {
  name: "asChild (link com aparência de botão)",
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} asChild>
        <a href="#exemplo">Ir para página</a>
      </Button>
      <Button {...args} asChild variant="outline" tone="neutral">
        <a href="#exemplo">Link outline</a>
      </Button>
    </div>
  ),
};

export const IconSizes: Story = {
  name: "Tamanhos de ícone",
  render: (args) => (
    <div className="flex items-center flex-wrap gap-3">
      <Button {...args} variant="ghost" tone="neutral" size="icon-xs" aria-label="Editar"><PencilIcon /></Button>
      <Button {...args} variant="ghost" tone="neutral" size="icon-sm" aria-label="Editar"><PencilIcon /></Button>
      <Button {...args} variant="ghost" tone="neutral" size="icon" aria-label="Editar"><PencilIcon /></Button>
      <Button {...args} variant="ghost" tone="destructive" size="icon-sm" aria-label="Excluir"><TrashIcon /></Button>
      <Button {...args} variant="outline" tone="neutral" size="icon-sm" aria-label="Próximo"><ArrowRightIcon /></Button>
    </div>
  ),
};
