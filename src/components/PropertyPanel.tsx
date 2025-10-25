import React from "react";
import { useElementStore } from "../store/useElementStore";

const PropertyPanel: React.FC = () => {
  const { selectedElement, update } = useElementStore();

  if (!selectedElement) {
    return (
      <div className="property-panel">
        <h3>动画属性</h3>
        <div className="muted">未选中元素</div>
      </div>
    );
  }

  const handleChange = (key: keyof typeof selectedElement, value: number) => {
    update(selectedElement.id, { [key]: value });
  };

  return (
    <div className="property-panel">
      <h3>{selectedElement.id}</h3>

      <div className="prop-group">
        <label>X：</label>
        <input
          type="number"
          value={selectedElement.x}
          onChange={(e) => handleChange("x", Number(e.target.value))}
        />
      </div>

      <div className="prop-group">
        <label>Y：</label>
        <input
          type="number"
          value={selectedElement.y}
          onChange={(e) => handleChange("y", Number(e.target.value))}
        />
      </div>

      <div className="prop-group">
        <label>宽度：</label>
        <input
          type="number"
          value={selectedElement.width}
          onChange={(e) => handleChange("width", Number(e.target.value))}
        />
      </div>

      <div className="prop-group">
        <label>高度：</label>
        <input
          type="number"
          value={selectedElement.height}
          onChange={(e) => handleChange("height", Number(e.target.value))}
        />
      </div>

      <div className="prop-group">
        <label>透明度：</label>
        <input
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={selectedElement.opacity}
          onChange={(e) => handleChange("opacity", Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default PropertyPanel;
