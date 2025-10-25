export default function App() {
  return (
    <div className="motion-lab">
      <div className="toolbar">
        <div className="logo">GSAP Motion Lab</div>
        <div className="toolbar-actions">
          <button className="btn">新建矩形</button>
          <button className="btn">播放</button>
          <button className="btn">暂停</button>
          <button className="btn btn-primary">AI 生成</button>
          <button className="btn">导出</button>
        </div>
        <div className="toolbar-right">
          <button className="icon-btn" aria-label="设置">⚙️</button>
          <button className="icon-btn" aria-label="帮助">❔</button>
        </div>
      </div>

      <div className="main">
        <div className="canvas-area">
          <div className="canvas-placeholder">Canvas Area</div>
        </div>
        <div className="property-panel">
          <h3>动画属性</h3>
          <div className="muted">未选中元素</div>
        </div>
      </div>

      <div className="timeline">
        <div className="timeline-header">
          <div className="label">时间轴</div>
          <div className="ruler">
            <div className="tick" style={{ left: 0 }}><span>0s</span></div>
            <div className="tick" style={{ left: 80 }}><span>1s</span></div>
            <div className="tick" style={{ left: 160 }}><span>2s</span></div>
            <div className="tick" style={{ left: 240 }}><span>3s</span></div>
          </div>
        </div>
        <div className="tracks">
          <div className="track-label">主轨道</div>
          <div className="track-lane">
            <div className="clip" style={{ left: 80, width: 160 }}>
              <div className="clip-name">clip_1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
