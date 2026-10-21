import { useEffect, useRef, useState } from "react";
import { useMemeStore } from "../../context/MemeContext";
import { useMemeTexts } from "../../hooks/useMemeTexts";
import { fileToDataUrl } from "../../utils/image";
import ImagePicker from "./ImagePicker";
import TextLayerList from "./TextLayerList";
import MemeCanvas from "./MemeCanvas";
import Button from "../shared/Button";
import "./Editor.css";

export default function Editor() {
  const { images, addImage, addMeme } = useMemeStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const canvasRef = useRef(null);

  const {
    texts,
    addText,
    updateText,
    removeText,
    resetPositions,
    raiseLayer,
    lowerLayer,
    resetTexts,
  } = useMemeTexts();

  // When image changes, drop old text layers
  useEffect(() => {
    resetTexts();
  }, [selectedImage, resetTexts]);

  const handleUpload = async (file) => {
    try {
      const dataUrl = await fileToDataUrl(file);
      const newImage = {
        id: crypto.randomUUID(),
        name: file.name,
        dataUrl,
      };
      addImage(newImage);
      setSelectedImage(newImage);
    } catch (err) {
      alert("Could not load image: " + err.message);
    }
  };

  const handleSave = () => {
    if (!selectedImage || !canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    addMeme({
      id: crypto.randomUUID(),
      dataUrl,
      createdAt: Date.now(),
    });
    alert("Meme saved! Check the Gallery tab.");
  };

  return (
    <div className="editor">
      <div className="editor-left">
        <h2>1. Pick an image</h2>
        <ImagePicker
          images={images}
          selectedId={selectedImage?.id}
          onSelect={setSelectedImage}
          onUpload={handleUpload}
        />

        <div className="texts-header">
          <h2>2. Text layers</h2>
          <Button
            variant="ghost"
            onClick={addText}
            disabled={!selectedImage}
          >
            + Add text
          </Button>
        </div>

        {texts.length === 0 && (
          <p className="hint">No text yet. Click "+ Add text" to start.</p>
        )}

        <TextLayerList
          texts={texts}
          onUpdate={updateText}
          onRemove={removeText}
          onRaise={raiseLayer}
          onLower={lowerLayer}
        />

        {texts.some((t) => t.x !== null || t.y !== null) && (
          <Button variant="outline" onClick={resetPositions}>
            ↺ Reset all positions
          </Button>
        )}

        <Button onClick={handleSave} disabled={!selectedImage}>
          💾 Save Meme
        </Button>
      </div>

      <div className="editor-right">
        <h2>
          Preview{" "}
          <span className="hint-inline">
            {texts.length > 0 ? "(drag any text to move)" : ""}
          </span>
        </h2>
        {selectedImage ? (
          <MemeCanvas
            image={selectedImage}
            texts={texts}
            onMoveText={updateText}
            canvasRef={canvasRef}
          />
        ) : (
          <div className="preview-empty">
            Select or upload an image to start
          </div>
        )}
      </div>
    </div>
  );
}