import { create } from "zustand";

export interface ElementNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  isSelected?: boolean;
}

interface ElementState {
  elements: Record<string, ElementNode>;
  selectedId?: string;
  selectedElement?: ElementNode;
  addRect: () => void;
  update: (id: string, patch: Partial<ElementNode>) => void;
  select: (id?: string) => void;
}

let idCounter = 0;
const nextId = () => `el_${++idCounter}`;

export const useElementStore = create<ElementState>((set, get) => ({
  elements: {},
  selectedId: undefined,
  selectedElement: undefined,

  addRect: () =>
    set((s) => {
      const id = nextId();
      const el: ElementNode = {
        id,
        x: 100 + idCounter * 20,
        y: 100 + idCounter * 20,
        width: 160,
        height: 100,
        rotation: 0,
        opacity: 0.9,
        isSelected: false,
      };
      return { elements: { ...s.elements, [id]: el }, selectedId: id, selectedElement: el };
    }),

  update: (id, patch) =>
    set((s) => {
      const updated = { ...s.elements[id], ...patch };
      return {
        elements: { ...s.elements, [id]: updated },
        selectedElement: s.selectedId === id ? updated : s.selectedElement,
      };
    }),

  select: (id) =>
    set((s) => {
      const selected = id ? s.elements[id] : undefined;
      return {
        selectedId: id,
        selectedElement: selected,
        elements: Object.fromEntries(
          Object.entries(s.elements).map(([key, val]) => [
            key,
            { ...val, isSelected: key === id },
          ])
        ),
      };
    }),
}));
