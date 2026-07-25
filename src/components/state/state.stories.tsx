import type { Meta, StoryObj } from "@storybook/react";
import { Inbox } from "lucide-react";
import { Button } from "../button";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { LoadingState } from "./loading-state";

const meta: Meta = {
  title: "Components/State",
};

export default meta;

type Story = StoryObj;

export const Empty: Story = {
  render: () => (
    <EmptyState
      icon={<Inbox />}
      title="Nenhum registro encontrado"
      description="Ajuste os filtros ou cadastre um novo item para começar."
      action={<Button size="sm">Novo registro</Button>}
    />
  ),
};

export const EmptyMinimal: Story = {
  render: () => <EmptyState title="Nenhum resultado" />,
};

export const Error: Story = {
  render: () => (
    <ErrorState
      description="Não foi possível carregar os dados."
      onRetry={() => console.log("retry")}
    />
  ),
};

export const Loading: Story = {
  render: () => <LoadingState />,
};
