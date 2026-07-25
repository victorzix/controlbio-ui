import type { Meta, StoryObj } from "@storybook/react";
import { FileDropzone } from "./file-dropzone";

const meta: Meta<typeof FileDropzone> = {
  title: "Components/FileDropzone",
  component: FileDropzone,
  args: {
    onFilesSelected: (files) => console.log("files:", files),
  },
};

export default meta;

type Story = StoryObj<typeof FileDropzone>;

export const Default: Story = {
  args: {
    accept: ".xlsx,.csv",
    description: "Formatos aceitos: .xlsx, .csv",
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    description: "Selecione um ou mais arquivos",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    description: "Envio indisponível",
  },
};
