import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Toaster, toast } from "./index";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toast",
  component: Toaster,
};

export default meta;

export const Default: StoryObj<typeof Toaster> = {
  render: (args) => (
    <div>
      <Toaster {...args} />
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-background border rounded-md"
          onClick={() => toast("Notificação padrão")}
        >
          Default
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md"
          onClick={() => toast.success("Operação realizada com sucesso!")}
        >
          Success
        </button>
        <button
          className="px-4 py-2 bg-destructive text-white rounded-md"
          onClick={() => toast.error("Ocorreu um erro inesperado.")}
        >
          Error
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={() => toast.info("Aqui está uma informação útil.")}
        >
          Info
        </button>
        <button
          className="px-4 py-2 bg-yellow-600 text-white rounded-md"
          onClick={() => toast.warning("Atenção com esta ação.")}
        >
          Warning
        </button>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
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
  },
};
