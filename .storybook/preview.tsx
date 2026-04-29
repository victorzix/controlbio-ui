import React, { useEffect } from "react";
import type { Preview, Decorator } from "@storybook/react";
import "../src/styles/globals.css";
import "../src/styles/theme.css";

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "light";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="bg-background text-foreground min-h-screen p-6 transition-colors duration-200">
      <Story />
    </div>
  );
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Toggle dark mode",
    defaultValue: "light",
    toolbar: {
      icon: "mirror",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const decorators = [withTheme];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
