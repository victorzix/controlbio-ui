import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./select";
import { MultiSelect } from "./multi-select";

const priorityOptions = [
  { value: "critical", label: "Critical", description: "Must be resolved immediately" },
  { value: "high", label: "High", description: "Needs attention soon" },
  { value: "medium", label: "Medium", description: "Standard priority" },
  { value: "low", label: "Low", description: "Can be scheduled later" },
  { value: "backlog", label: "Backlog", description: "No active timeline" },
];

const simpleOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular", disabled: true },
  { value: "svelte", label: "Svelte" },
];

// ---------------------------------------------------------------------------
// Select (single)
// ---------------------------------------------------------------------------

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "Priority level",
    placeholder: "Select priority level",
    options: priorityOptions,
    required: true,
  },
};

export const WithHint: Story = {
  name: "Com hint",
  args: {
    label: "Prioridade",
    placeholder: "Selecione a prioridade",
    hint: "Escolha com base no impacto para o usuário.",
    options: priorityOptions,
  },
};

export const WithError: Story = {
  name: "Com erro",
  args: {
    label: "Prioridade",
    placeholder: "Selecione a prioridade",
    error: "Campo obrigatório.",
    options: priorityOptions,
  },
};

export const Disabled: Story = {
  args: {
    label: "Prioridade",
    placeholder: "Selecione a prioridade",
    options: priorityOptions,
    disabled: true,
    defaultValue: "high",
  },
};

export const WithDisabledOption: Story = {
  name: "Com opção desabilitada",
  args: {
    label: "Framework",
    placeholder: "Selecione um framework",
    options: simpleOptions,
  },
};

export const SizeSm: Story = {
  name: "Tamanho sm",
  args: {
    label: "Prioridade",
    placeholder: "Selecione...",
    options: priorityOptions,
    size: "sm",
  },
};

export const SizeLg: Story = {
  name: "Tamanho lg",
  args: {
    label: "Prioridade",
    placeholder: "Selecione...",
    options: priorityOptions,
    size: "lg",
  },
};

export const Controlled: Story = {
  name: "Controlado",
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="flex flex-col gap-4 max-w-sm">
        <Select
          label="Prioridade"
          placeholder="Selecione a prioridade"
          options={priorityOptions}
          value={value}
          onValueChange={setValue}
        />
        <p className="text-sm text-muted-foreground">
          Valor selecionado: <strong>{value || "—"}</strong>
        </p>
      </div>
    );
  },
};

export const AllStates: Story = {
  name: "Todos os estados",
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Select
        label="Normal"
        placeholder="Select priority level"
        options={priorityOptions}
        required
      />
      <Select
        label="Com valor selecionado"
        placeholder="Select priority level"
        options={priorityOptions}
        defaultValue="high"
      />
      <Select
        label="Com hint"
        placeholder="Select priority level"
        options={priorityOptions}
        hint="Escolha com base no impacto."
      />
      <Select
        label="Com erro"
        placeholder="Select priority level"
        options={priorityOptions}
        error="Campo obrigatório."
      />
      <Select
        label="Desabilitado"
        placeholder="Select priority level"
        options={priorityOptions}
        disabled
        defaultValue="medium"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// MultiSelect
// ---------------------------------------------------------------------------

export const Multi: StoryObj<typeof MultiSelect> = {
  name: "Multi Select",
  render: () => (
    <div className="max-w-sm">
      <MultiSelect
        label="Prioridades"
        placeholder="Selecione as prioridades"
        options={priorityOptions}
        required
      />
    </div>
  ),
};

export const MultiControlled: StoryObj<typeof MultiSelect> = {
  name: "Multi Select — Controlado",
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="flex flex-col gap-4 max-w-sm">
        <MultiSelect
          label="Prioridades"
          placeholder="Selecione as prioridades"
          options={priorityOptions}
          value={value}
          onValueChange={setValue}
        />
        <p className="text-sm text-muted-foreground">
          Selecionados: <strong>{value.join(", ") || "—"}</strong>
        </p>
      </div>
    );
  },
};

export const MultiWithError: StoryObj<typeof MultiSelect> = {
  name: "Multi Select — Com erro",
  render: () => (
    <div className="max-w-sm">
      <MultiSelect
        label="Prioridades"
        placeholder="Selecione as prioridades"
        options={priorityOptions}
        error="Selecione ao menos uma prioridade."
      />
    </div>
  ),
};

export const MultiDisabled: StoryObj<typeof MultiSelect> = {
  name: "Multi Select — Desabilitado",
  render: () => (
    <div className="max-w-sm">
      <MultiSelect
        label="Prioridades"
        placeholder="Selecione as prioridades"
        options={priorityOptions}
        defaultValue={["critical", "high"]}
        disabled
      />
    </div>
  ),
};

export const MultiAllStates: StoryObj<typeof MultiSelect> = {
  name: "Multi Select — Todos os estados",
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <MultiSelect
        label="Normal"
        placeholder="Selecione as prioridades"
        options={priorityOptions}
        required
      />
      <MultiSelect
        label="Com valores selecionados"
        placeholder="Selecione as prioridades"
        options={priorityOptions}
        defaultValue={["critical", "high", "medium"]}
      />
      <MultiSelect
        label="Limite de exibição (maxDisplay=2)"
        placeholder="Selecione as prioridades"
        options={priorityOptions}
        defaultValue={["critical", "high", "medium"]}
        maxDisplay={2}
      />
      <MultiSelect
        label="Com hint"
        placeholder="Selecione as prioridades"
        options={priorityOptions}
        hint="Você pode selecionar múltiplas prioridades."
      />
      <MultiSelect
        label="Com erro"
        placeholder="Selecione as prioridades"
        options={priorityOptions}
        error="Selecione ao menos uma prioridade."
      />
      <MultiSelect
        label="Desabilitado"
        placeholder="Selecione as prioridades"
        options={priorityOptions}
        disabled
        defaultValue={["high"]}
      />
    </div>
  ),
};