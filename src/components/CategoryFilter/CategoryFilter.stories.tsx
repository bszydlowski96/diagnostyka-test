import CategoryFilter from "./CategoryFilter";

export default {
  title: "Components/CategoryFilter",
  component: CategoryFilter,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: () => {},
  },
};

export const Default = {
  args: {
    value: "Wszystkie",
    options: ["Wszystkie", "Krew", "Hormony", "Mocz"],
  },
};

export const SelectedCategory = {
  args: {
    value: "Krew",
    options: ["Wszystkie", "Krew", "Hormony", "Mocz"],
  },
};

export const ManyOptions = {
  args: {
    value: "Wszystkie",
    options: [
      "Wszystkie",
      "Krew",
      "Hormony",
      "Mocz",
      "Biochemia",
      "Immunologia",
      "Mikrobiologia",
    ],
  },
};
