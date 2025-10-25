import React from "react";

interface ToolbarProps {
  onNewRect?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onOpenAI?: () => void;
  onExport?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onNewRect,
  onPlay,
  onPause,
  onOpenAI,
  onExport,
}) => {
  return (
    <div className="toolbar">
      <div className="logo">GSAP Motion Lab</div>
      <div className="toolbar-actions">
        <button className="btn" onClick={onNewRect}>新建矩形</button>
        <button className="btn" onClick={onPlay}>播放</button>
        <button className="btn" onClick={onPause}>暂停</button>
        <button className="btn btn-primary" onClick={onOpenAI}>AI 生成</button>
        <button className="btn" onClick={onExport}>导出</button>
      </div>
      <div className="toolbar-right">
        <button className="icon-btn" aria-label="设置">⚙️</button>
        <button className="icon-btn" aria-label="帮助">❔</button>
      </div>
    </div>
  );
};

export default Toolbar;
