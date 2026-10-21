import { useState } from "react";

let layerCounter = 0;

const makeLayer = (index) => ({
  id: crypto.randomUUID(),
  content: "",
  x: null,
  y: null,
  fontSize: 48,
  color: "#ffffff",
  _label: `Text ${++layerCounter}`,
  _staggerIndex: index,
});

/**
 * All text-layer operations for the editor.
 * Returns the list and every action needed to modify it.
 */
export function useMemeTexts() {
  const [texts, setTexts] = useState([]);

  const addText = () => {
    setTexts((prev) => [...prev, makeLayer(prev.length)]);
  };

  const updateText = (id, patch) => {
    setTexts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  };

  const removeText = (id) => {
    setTexts((prev) => prev.filter((t) => t.id !== id));
  };

  const resetPositions = () => {
    setTexts((prev) => prev.map((t) => ({ ...t, x: null, y: null })));
  };

  const raiseLayer = (id) => {
    setTexts((prev) => {
      const i = prev.findIndex((t) => t.id === id);
      if (i < 0 || i === prev.length - 1) return prev;
      const next = [...prev];
      [next[i], next[i + 1]] = [next[i + 1], next[i]];
      return next;
    });
  };

  const lowerLayer = (id) => {
    setTexts((prev) => {
      const i = prev.findIndex((t) => t.id === id);
      if (i <= 0) return prev;
      const next = [...prev];
      [next[i], next[i - 1]] = [next[i - 1], next[i]];
      return next;
    });
  };

  const resetTexts = () => {
    setTexts([]);
    layerCounter = 0;
  };

  return {
    texts,
    addText,
    updateText,
    removeText,
    resetPositions,
    raiseLayer,
    lowerLayer,
    resetTexts,
  };
}