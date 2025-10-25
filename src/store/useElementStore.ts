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
  addRect: () => void;
  update: (id: string, patch: Partial<ElementNode>) => void;
  select: (id?: string) => void;
}

let idCounter = 0;
const nextId = () => `el_${++idCounter}`;

export const useElementStore = create<ElementState>((set) => ({
  elements: {},
  selectedId: undefined,

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
      return { elements: { ...s.elements, [id]: el }, selectedId: id };
    }),

  update: (id, patch) =>
    set((s) => ({
      elements: { ...s.elements, [id]: { ...s.elements[id], ...patch } },
    })),

  select: (id) =>
    set((s) => ({
      selectedId: id,
      elements: Object.fromEntries(
        Object.entries(s.elements).map(([key, val]) => [
          key,
          { ...val, isSelected: key === id },
        ])
      ),
    })),
}));
