import Modal from "./Modal";

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  args: {
    open: true,
    title: "Tytuł modala",
    onClose: () => {},
    children: (
      <div>
        <p>To jest zawartość modala. Tutaj można umieścić dowolny content.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    ),
  },
};

export const SmallModal = {
  args: {
    open: true,
    title: "Mały modal",
    size: "sm",
    onClose: () => {},
    children: <p>To jest mały modal.</p>,
  },
};

export const LargeModal = {
  args: {
    open: true,
    title: "Duży modal",
    size: "lg",
    onClose: () => {},
    children: (
      <div>
        <h4>Szczegółowe informacje</h4>
        <p>To jest duży modal z większą ilością treści.</p>
        <div style={{ marginTop: "1rem" }}>
          <button style={{ marginRight: "0.5rem" }}>Zapisz</button>
          <button>Anuluj</button>
        </div>
      </div>
    ),
  },
};

export const WithoutTitle = {
  args: {
    open: true,
    onClose: () => {},
    children: <p>Modal bez tytułu</p>,
  },
};
