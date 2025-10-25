import { useCallback } from "react";
import gsap from "gsap";
import Toolbar from "../components/Toolbar";
import CanvasArea from "../components/CanvasArea";
import PropertyPanel from "../components/PropertyPanel";
import { useElementStore } from "../store/useElementStore";
import { useTimelineStore } from "../store/useTimelineStore";

export default function MotionLabPage() {
  const addRect = useElementStore((s) => s.addRect);
  const selectedElement = useElementStore((s) => s.selectedElement);
  const updateElement = useElementStore((s) => s.update);

  const { getTween, setTween, stopTween } = useTimelineStore((s) => ({
    getTween: s.getTween,
    setTween: s.setTween,
    stopTween: s.stopTween,
  }));

  const handlePlay = useCallback(() => {
    if (!selectedElement) return;

    const { id, initialX, initialY, animDistanceX, animDistanceY, animDuration } = selectedElement;

    stopTween(id);

    updateElement(id, { x: initialX, y: initialY }, { syncInitial: false });

    const animatedState = { x: initialX, y: initialY };
    const targetX = initialX + animDistanceX;
    const targetY = initialY + animDistanceY;

    const tween = gsap.to(animatedState, {
      x: targetX,
      y: targetY,
      duration: animDuration,
      ease: "power1.inOut",
      onUpdate: () => {
        updateElement(id, { x: animatedState.x, y: animatedState.y }, { syncInitial: false });
      },
      onComplete: () => {
        updateElement(id, { x: targetX, y: targetY }, { syncInitial: false });
      },
    });

    setTween(id, tween);
  }, [selectedElement, stopTween, setTween, updateElement]);

  const handlePause = useCallback(() => {
    if (!selectedElement) return;
    const tween = getTween(selectedElement.id);
    tween?.pause();
  }, [selectedElement, getTween]);

  return (
    <div className="motion-lab">
      <Toolbar
        onNewRect={addRect}
        onPlay={handlePlay}
        onPause={handlePause}
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
