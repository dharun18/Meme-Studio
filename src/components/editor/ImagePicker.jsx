import UploadButton from "../shared/UploadButton";

export default function ImagePicker({ images, selectedId, onSelect, onUpload }) {
  if (images.length === 0) {
    return (
      <div className="image-picker">
        <p className="hint">No images yet — upload one below.</p>
        <UploadButton label="+ Upload image" onFiles={(files) => onUpload(files[0])} />
      </div>
    );
  }

  return (
    <div className="image-picker">
      <div className="thumb-strip">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.dataUrl}
            alt={img.name}
            className={selectedId === img.id ? "thumb selected" : "thumb"}
            onClick={() => onSelect(img)}
          />
        ))}
      </div>
      <UploadButton label="+ Upload new image" onFiles={(files) => onUpload(files[0])} />
    </div>
  );
}