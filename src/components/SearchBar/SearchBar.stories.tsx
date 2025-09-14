import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchBar from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "Szukaj po nazwie lub kodzie...",
  },
};

export const WithValue: Story = {
  args: {
    value: "Morfologia",
    placeholder: "Szukaj po nazwie lub kodzie...",
  },
};
