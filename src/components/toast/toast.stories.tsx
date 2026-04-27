import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Toaster, toast } from "./index";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toast",
  component: Toaster,
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "Posição onde as notificações aparecerão.",
    },
    expand: {
      control: "boolean",
      description: "Se true, as notificações aparecem empilhadas e expandidas.",
    },
    richColors: {
      control: "boolean",
      description: "Se true, usa cores vibrantes para os estados de status.",
    },
    closeButton: {
      control: "boolean",
      description: "Exibe um botão de fechar em cada notificação.",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Toaster> = {
  render: (args) => (
    <div>
      <Toaster {...args} />
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-background border rounded-md hover:bg-accent transition-colors"
          onClick={() => toast("Notificação padrão")}
        >
          Default
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          onClick={() => toast.success("Operação realizada com sucesso!")}
        >
          Success
        </button>
        <button
          className="px-4 py-2 bg-destructive text-white rounded-md hover:bg-destructive/90 transition-colors"
          onClick={() => toast.error("Ocorreu um erro inesperado.")}
        >
          Error
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => toast.info("Aqui está uma informação útil.")}
        >
          Info
        </button>
        <button
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
          onClick={() => toast.warning("Atenção com esta ação.")}
        >
          Warning
        </button>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={() =>
            toast("Mensagem com ação", {
              action: {
                label: "Desfazer",
                onClick: () => console.log("Desfeito"),
              },
            })
          }
        >
          With Action
        </button>
      </div>
    </div>
  ),
  args: {
    position: "bottom-right",
    richColors: true,
    closeButton: true,
  },
};
