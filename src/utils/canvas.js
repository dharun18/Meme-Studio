/**
 * Wraps text into lines that fit within maxWidth.
 */
export function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  });

  if (current) lines.push(current);
  return lines;
}

/**
 * Draw one text layer on the canvas.
 * Returns the bounding box: { x, y, width, height }.
 */
export function drawTextLayer(ctx, layer, canvasWidth) {
  if (!layer.content.trim()) return null;

  ctx.font = `bold ${layer.fontSize}px Impact, Arial Black, sans-serif`;
  ctx.fillStyle = layer.color;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = Math.max(2, layer.fontSize / 12);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lineHeight = layer.fontSize * 1.15;
  const lines = wrapText(ctx, layer.content.toUpperCase(), canvasWidth - 40);

  const stagger = (layer._staggerIndex % 5) * (layer.fontSize + 20);
  const centerX = layer.x ?? canvasWidth / 2;
  const baseY = layer.y ?? 30 + layer.fontSize / 2 + stagger;

  let maxWidth = 0;
  lines.forEach((line, i) => {
    const ly = baseY + i * lineHeight;
    ctx.strokeText(line, centerX, ly);
    ctx.fillText(line, centerX, ly);
    const w = ctx.measureText(line).width;
    if (w > maxWidth) maxWidth = w;
  });

  return {
    x: centerX - maxWidth / 2,
    y: baseY - lineHeight / 2,
    width: maxWidth,
    height: lines.length * lineHeight,
  };
}

/**
 * Convert a pointer event's clientX/Y into canvas-space coordinates.
 */
export function getCanvasCoords(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

export function pointInBox(point, box, pad = 10) {
  return (
    point.x >= box.x - pad &&
    point.x <= box.x + box.width + pad &&
    point.y >= box.y - pad &&
    point.y <= box.y + box.height + pad
  );
}