import { useEffect, useRef } from "react";
import { drawTextLayer } from "../../utils/canvas";
import { useCanvasDrag } from "../../hooks/useCanvasDrag";

export default function MemeCanvas({ image, texts, onMoveText, canvasRef }) {
  const layoutRef = useRef({});

  const drag = useCanvasDrag({
    canvasRef,
    layoutRef,
    texts,
    onMove: onMoveText,
  });

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image.dataUrl;

    img.onload = () => {
      const maxW = 600;
      const scale = Math.min(1, maxW / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      layoutRef.current = {};
      texts.forEach((layer) => {
        const box = drawTextLayer(ctx, layer, canvas.width);
        if (box) layoutRef.current[layer.id] = box;
      });
    };
  }, [image, texts, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      onPointerCancel={drag.onPointerUp}
    />
  );
}