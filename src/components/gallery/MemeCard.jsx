import Button from "../shared/Button";
import { downloadDataUrl } from "../../utils/image";

export default function MemeCard({ meme, onDelete }) {
  return (
    <div className="meme-card">
      <img src={meme.dataUrl} alt="meme" />
      <div className="meme-actions">
        <Button
          variant="danger"
          onClick={() =>
            downloadDataUrl(meme.dataUrl, `meme-${meme.id.slice(0, 6)}.png`)
          }
        >
          ⬇ Download
        </Button>
        <Button variant="danger" onClick={() => onDelete(meme.id)}>
          🗑 Delete
        </Button>
      </div>
    </div>
  );
}