export default function ImageCard({ image, onDelete }) {
  return (
    <div className="image-card">
      <img src={image.dataUrl} alt={image.name} />
      <div className="image-info">
        <span className="image-name" title={image.name}>
          {image.name}
        </span>
        <button
          className="delete-btn"
          onClick={() => onDelete(image.id)}
          title="Delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
}