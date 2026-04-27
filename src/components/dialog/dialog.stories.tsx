import type { Meta, StoryObj } from "@storybook/react";
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

/**
 * Componente de modal baseado em Radix UI.
 */
const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
};

export default meta;

export const Default: StoryObj<any> = {
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

/**
 * História isolada para o botão de cancelamento.
 */
export const CancelButton: StoryObj<typeof DialogCancelButton> = {
  render: (args) => <DialogCancelButton {...args}>Cancelar</DialogCancelButton>,
  args: {
    disabled: false,
  }
};

/**
 * História isolada para o botão de confirmação.
 */
export const ConfirmButton: StoryObj<typeof DialogConfirmButton> = {
  render: (args) => <DialogConfirmButton {...args}>Confirmar</DialogConfirmButton>,
  args: {
    disabled: false,
  }
};
