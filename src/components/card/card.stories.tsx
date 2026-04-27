import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "./card";
import { Button } from "../button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};

export default meta;

export const Default: StoryObj<typeof Card> = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Projeto de Controle</CardTitle>
        <CardDescription>Gerencie os dados biológicos do seu projeto.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          Este card utiliza a fonte oficial BlauerNue e a paleta de cores da ControlBio.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar</Button>
      </CardFooter>
    </Card>
  ),
};

export const Statistics: StoryObj<typeof Card> = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total de Amostras</CardDescription>
          <CardTitle className="text-4xl text-primary font-bold">1,284</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Aguardando Análise</CardDescription>
          <CardTitle className="text-4xl text-accent-foreground font-bold">42</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">-5% em relação ao mês anterior</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Críticos</CardDescription>
          <CardTitle className="text-4xl text-destructive font-bold">3</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Ação imediata necessária</p>
        </CardContent>
      </Card>
    </div>
  ),
};
