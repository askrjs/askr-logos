import { createIsland } from "@askrjs/askr/boot";

export function mount(element: JSX.Element): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  createIsland({ root: container, component: () => element });
  return container;
}

export function unmount(container?: HTMLElement): void {
  if (container?.parentNode) {
    document.body.removeChild(container);
  }
}
