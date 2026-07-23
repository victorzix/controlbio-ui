import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    page: { control: "number" },
    totalPages: { control: "number" },
    showOnSinglePage: { control: "boolean" },
    onPageChange: { control: false },
  },
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page ?? 1);
    return (
      <div className="rounded-md border border-border">
        <div className="px-5 py-8 text-sm text-muted-foreground">
          Conteúdo da tabela…
        </div>
        <Pagination {...args} page={page} onPageChange={setPage} />
      </div>
    );
  },
  args: { page: 1, totalPages: 8 },
};

export const MiddlePage: Story = {
  name: "Página do meio",
  render: (args) => {
    const [page, setPage] = useState(4);
    return (
      <div className="rounded-md border border-border">
        <div className="px-5 py-8 text-sm text-muted-foreground">Conteúdo…</div>
        <Pagination {...args} page={page} onPageChange={setPage} />
      </div>
    );
  },
  args: { totalPages: 8 },
};

export const SinglePageHidden: Story = {
  name: "Uma página (escondido)",
  render: (args) => (
    <div className="rounded-md border border-border">
      <div className="px-5 py-8 text-sm text-muted-foreground">
        Só há 1 página — a paginação não é renderizada.
      </div>
      <Pagination {...args} page={1} totalPages={1} onPageChange={() => {}} />
    </div>
  ),
};
