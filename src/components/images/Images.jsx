import { useMemeStore } from "../../context/MemeContext";
import { fileToDataUrl } from "../../utils/image";
import UploadButton from "../shared/UploadButton";
import EmptyState from "../shared/EmptyState";
import ImageCard from "./ImageCard";
import "./Images.css";

export default function Images() {
  const { images, addImage, deleteImage } = useMemeStore();

  const handleUpload = async (files) => {
    for (const file of files) {
      try {
        const dataUrl = await fileToDataUrl(file);
        addImage({
          id: crypto.randomUUID(),
          name: file.name,
          dataUrl,
        });
      } catch (err) {
        console.warn(`Skipped ${file.name}: ${err.message}`);
      }
    }
  };

  return (
    <div className="images-page">
      <div className="toolbar">
        <h2>Your Images</h2>
        <UploadButton
          label="+ Upload Images"
          multiple
          onFiles={handleUpload}
        />
      </div>

      {images.length === 0 ? (
        <EmptyState>
          <p>No images yet. Upload some to get started!</p>
        </EmptyState>
      ) : (
        <div className="image-grid">
          {images.map((img) => (
            <ImageCard key={img.id} image={img} onDelete={deleteImage} />
          ))}
        </div>
      )}
    </div>
  );
}