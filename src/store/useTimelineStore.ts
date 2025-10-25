import { create } from "zustand";
import type gsap from "gsap";

interface TimelineState {
  tweens: Record<string, gsap.core.Tween | undefined>;
  setTween: (id: string, tween: gsap.core.Tween) => void;
  getTween: (id: string) => gsap.core.Tween | undefined;
  stopTween: (id: string) => void;
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  tweens: {},

  setTween: (id, tween) =>
    set((state) => ({
      tweens: {
        ...state.tweens,
        [id]: tween,
      },
    })),

  getTween: (id) => get().tweens[id],

  stopTween: (id) =>
    set((state) => {
      const existing = state.tweens[id];
      if (existing) {
        existing.kill();
      }
      const rest = { ...state.tweens };
      delete rest[id];
      return { tweens: rest };
    }),
}));
