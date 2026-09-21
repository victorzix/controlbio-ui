import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogCancelButton,
  DialogConfirmButton,
  DialogClose
} from "./dialog";
import { MultiSelect } from "../select/multi-select";

/**
 * Props para a história do Dialog.
 */
interface DialogStoryProps extends React.ComponentProps<typeof Dialog> {
  showClose?: boolean;
}

const meta: Meta<DialogStoryProps> = {
  title: "Components/Dialog",
  component: Dialog,
};

export default meta;

type Story = StoryObj<DialogStoryProps>;

export const Default: Story = {
  render: ({ showClose, ...args }) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Open Dialog
        </button>
      </DialogTrigger>
      <DialogContent showClose={showClose}>
        <DialogHeader>
          <DialogTitle>Confirmação de Ação</DialogTitle>
          <DialogDescription>
            Você está prestes a realizar uma alteração importante. Deseja continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <DialogCancelButton>Cancelar</DialogCancelButton>
          </DialogClose>
          <DialogConfirmButton onConfirm={() => console.log("Confirmado!")}>
            Confirmar
          </DialogConfirmButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  argTypes: {
    showClose: { 
      control: "boolean",
      description: "Define se o ícone de fechar (X) será exibido no canto superior.",
      table: { category: "Content" }
    },
  },
  args: {
    showClose: true,
  }
};

export const DestructiveConfirm: Story = {
  render: ({ showClose, ...args }) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md">
          Excluir registro
        </button>
      </DialogTrigger>
      <DialogContent showClose={showClose}>
        <DialogHeader>
          <DialogTitle>Excluir registro</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Deseja realmente excluir este item?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <DialogCancelButton tone="destructive">Cancelar</DialogCancelButton>
          </DialogClose>
          <DialogConfirmButton
            tone="destructive"
            onConfirm={() => console.log("Excluído!")}
          >
            Excluir
          </DialogConfirmButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  args: {
    showClose: true,
  },
};

const longLabelOptions = [
  { value: "dispositivosmedicos", label: "DISPOSITIVOSMEDICOS — DISPOSITIVOS MÉDICOS" },
  { value: "testeamostramatriz", label: "TESTEAMOSTRAMATRIZ — TESTE AMOSTRA/MATRIZ" },
  { value: "outramatrizlonga", label: "OUTRAMATRIZLONGA — OUTRA MATRIZ COM NOME BEM COMPRIDO" },
];

export const WithMultiSelectLongLabels: Story = {
  name: "Regressão — MultiSelect com rótulos longos não estoura o diálogo",
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Abrir
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar método de análise</DialogTitle>
          <DialogDescription>
            Com várias matrizes de rótulo longo selecionadas, o diálogo deve
            permanecer dentro de <code>max-w-lg</code> — o trigger trunca com
            reticências, nunca empurra a caixa pra fora da tela.
          </DialogDescription>
        </DialogHeader>
        <MultiSelect
          label="Matrizes"
          options={longLabelOptions}
          defaultValue={longLabelOptions.map((o) => o.value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <DialogCancelButton>Cancelar</DialogCancelButton>
          </DialogClose>
          <DialogConfirmButton>Salvar</DialogConfirmButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const CancelButton: StoryObj<typeof DialogCancelButton> = {
  render: (args) => <DialogCancelButton {...args}>Cancelar</DialogCancelButton>,
  args: {
    disabled: false,
  }
};

export const ConfirmButton: StoryObj<typeof DialogConfirmButton> = {
  render: (args) => <DialogConfirmButton {...args}>Confirmar</DialogConfirmButton>,
  args: {
    disabled: false,
  }
};
