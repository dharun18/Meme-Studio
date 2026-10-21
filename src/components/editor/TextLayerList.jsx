import TextLayerItem from "./TextLayerItem";

export default function TextLayerList({
  texts,
  onUpdate,
  onRemove,
  onRaise,
  onLower,
}) {
  // Display top-layer-first, but keep array order = z-order
  const reversed = [...texts].reverse();

  return (
    <div className="text-layer-list">
      {reversed.map((layer, revIdx) => {
        const originalIdx = texts.length - 1 - revIdx;
        return (
          <TextLayerItem
            key={layer.id}
            layer={layer}
            isFirst={originalIdx === 0}
            isLast={originalIdx === texts.length - 1}
            onChange={(patch) => onUpdate(layer.id, patch)}
            onRemove={() => onRemove(layer.id)}
            onRaise={() => onRaise(layer.id)}
            onLower={() => onLower(layer.id)}
          />
        );
      })}
    </div>
  );
}