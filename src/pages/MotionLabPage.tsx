import { useElementStore } from "../store/useElementStore";
import CanvasArea from "../components/CanvasArea";

export default function MotionLabPage() {
  const { addRect } = useElementStore();

  return (
    <div className="motion-lab">
      <div className="toolbar">
        <div className="logo">GSAP Motion Lab</div>
        <div className="toolbar-actions">
          <button className="btn" onClick={addRect}>新建矩形</button>
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
        {/* 画布区改为组件，保持现有功能 */}
        <CanvasArea />

        {/* 右侧属性区先保持静态占位，后续再替换为组件 */}
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
