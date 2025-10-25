import React, { useEffect } from "react";
import interact from "interactjs";
import { useElementStore } from "../store/useElementStore";

const CanvasArea: React.FC = () => {
  const { elements, update, select } = useElementStore();

  const elementSignature = Object.keys(elements).join("|");

  useEffect(() => {
    const ids = elementSignature.length > 0 ? elementSignature.split("|") : [];
    const selectors = ids.map((id) => ({ id, selector: `[data-el='${id}']` }));

    selectors.forEach(({ id, selector }) => {
      interact(selector)
        .draggable({
          listeners: {
            move(event) {
              const { elements: currentElements } = useElementStore.getState();
              const current = currentElements[id];
              if (!current) return;

              update(
                id,
                {
                  x: current.x + event.dx,
                  y: current.y + event.dy,
                },
                { syncInitial: true }
              );
            },
          },
        })
        .on("click", () => select(id));
    });

    return () => {
      selectors.forEach(({ selector }) => {
        interact(selector).unset();
      });
    };
  }, [elementSignature, update, select]);

  return (
    <div className="canvas-area">
      <svg
        className="canvas-svg"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="1200" height="700" fill="url(#grid)" />

        {Object.values(elements).map((el) => (
          <g
            key={el.id}
            data-el={el.id}
            transform={`translate(${el.x},${el.y}) rotate(${el.rotation})`}
            className={`canvas-el ${el.isSelected ? "active" : ""}`}
          >
            <rect
              width={el.width}
              height={el.height}
              fill="#4fc3f7"
              opacity={el.opacity}
              rx="8"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default CanvasArea;
