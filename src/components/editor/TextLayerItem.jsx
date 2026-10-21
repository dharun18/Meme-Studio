export default function TextLayerItem({
  layer,
  isFirst,
  isLast,
  onChange,
  onRemove,
  onRaise,
  onLower,
}) {
  return (
    <div className="text-layer">
      <div className="text-layer-head">
        <span>{layer._label}</span>
        <div className="layer-actions">
          <button
            className="icon-btn"
            title="Bring forward"
            onClick={onRaise}
            disabled={isLast}
          >
            ↑
          </button>
          <button
            className="icon-btn"
            title="Send backward"
            onClick={onLower}
            disabled={isFirst}
          >
            ↓
          </button>
          <button
            className="remove-text-btn"
            title="Remove"
            onClick={onRemove}
          >
            ✕
          </button>
        </div>
      </div>
      <input
        value={layer.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Type text…"
      />
      <div className="row">
        <label className="field compact">
          <span>Size: {layer.fontSize}px</span>
          <input
            type="range"
            min="16"
            max="100"
            value={layer.fontSize}
            onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
          />
        </label>
        <label className="field compact">
          <span>Color</span>
          <input
            type="color"
            value={layer.color}
            onChange={(e) => onChange({ color: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
}