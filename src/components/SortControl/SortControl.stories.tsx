import SortControl from "./SortControl";

export default {
  title: "Components/SortControl",
  component: SortControl,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: () => {},
  },
};

export const Ascending = {
  args: {
    value: "asc",
  },
};

export const Descending = {
  args: {
    value: "desc",
  },
};
