import { useRef } from "react";
import { getCanvasCoords, pointInBox } from "../utils/canvas";

/**
 * Handles pointer-drag interaction on the canvas.
 *
 * @param canvasRef - ref to the <canvas>
 * @param layoutRef - ref to { [textId]: boundingBox }
 * @param texts     - current list of text layers
 * @param onMove    - callback(id, { x, y })
 */
export function useCanvasDrag({ canvasRef, layoutRef, texts, onMove }) {
  const dragRef = useRef({ activeId: null, offsetX: 0, offsetY: 0 });

  const hitTest = (point) => {
    for (let i = texts.length - 1; i >= 0; i--) {
      const layer = texts[i];
      const box = layoutRef.current[layer.id];
      if (box && pointInBox(point, box)) return layer;
    }
    return null;
  };

  const onPointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const point = getCanvasCoords(e, canvas);
    const layer = hitTest(point);
    if (!layer) return;

    const stagger = (layer._staggerIndex % 5) * (layer.fontSize + 20);
    const centerX = layer.x ?? canvas.width / 2;
    const centerY = layer.y ?? 30 + layer.fontSize / 2 + stagger;

    dragRef.current = {
      activeId: layer.id,
      offsetX: point.x - centerX,
      offsetY: point.y - centerY,
    };

    try {
      canvas.setPointerCapture(e.pointerId);
    } catch (_) {}
    canvas.style.cursor = "grabbing";
    e.preventDefault();
  };

  const onPointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!dragRef.current.activeId) {
      const layer = hitTest(getCanvasCoords(e, canvas));
      canvas.style.cursor = layer ? "grab" : "default";
      return;
    }

    const point = getCanvasCoords(e, canvas);
    const newX = point.x - dragRef.current.offsetX;
    const newY = point.y - dragRef.current.offsetY;

    const clampedX = Math.max(20, Math.min(canvas.width - 20, newX));
    const clampedY = Math.max(20, Math.min(canvas.height - 20, newY));

    onMove(dragRef.current.activeId, { x: clampedX, y: clampedY });
  };

  const onPointerUp = (e) => {
    const canvas = canvasRef.current;
    if (dragRef.current.activeId && canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }
    dragRef.current.activeId = null;
    if (canvas) canvas.style.cursor = "default";
  };

  return { onPointerDown, onPointerMove, onPointerUp };
}