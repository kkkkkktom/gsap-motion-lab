import React, { useEffect, useRef } from "react";
import interact from "interactjs";
import { useElementStore } from "../store/useElementStore";

const CanvasArea: React.FC = () => {
  const { elements, update, select } = useElementStore();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // 清理旧事件
    interact(".canvas-el").unset();

    Object.values(elements).forEach((el) => {
      const selector = `[data-el='${el.id}']`;

      interact(selector)
        .draggable({
          listeners: {
            move(event) {
              update(el.id, {
                x: el.x + event.dx,
                y: el.y + event.dy,
              });
            },
          },
        })
        .on("click", () => select(el.id));
    });
  }, [elements, update, select]);

  return (
    <section className="canvas-area">
      <svg
        ref={svgRef}
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
            {el.type === "rect" && (
              <rect
                width={el.width}
                height={el.height}
                fill="#4fc3f7"
                opacity={el.opacity}
                rx="8"
              />
            )}
          </g>
        ))}
      </svg>
    </section>
  );
};

export default CanvasArea;
