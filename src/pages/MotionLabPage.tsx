import Toolbar from "../components/Toolbar";
import CanvasArea from "../components/CanvasArea";
import PropertyPanel from "../components/PropertyPanel";
import { useElementStore } from "../store/useElementStore";

export default function MotionLabPage() {
  const { addRect } = useElementStore();

  return (
    <div className="motion-lab">
      <Toolbar
        onNewRect={addRect}
        onPlay={() => console.log("播放")}
        onPause={() => console.log("暂停")}
        onOpenAI={() => console.log("AI 生成")}
        onExport={() => console.log("导出配置")}
      />

      <div className="main">
        <CanvasArea />
        <PropertyPanel />
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
