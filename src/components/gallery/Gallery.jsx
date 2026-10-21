import { useMemeStore } from "../../context/MemeContext";
import MemeCard from "./MemeCard";
import EmptyState from "../shared/EmptyState";
import "./Gallery.css";

export default function Gallery() {
  const { memes, deleteMeme } = useMemeStore();

  return (
    <div className="gallery">
      <h2>Saved Memes ({memes.length})</h2>

      {memes.length === 0 ? (
        <EmptyState>
          <p>No memes yet. Go to the Editor and make one!</p>
        </EmptyState>
      ) : (
        <div className="meme-grid">
          {memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} onDelete={deleteMeme} />
          ))}
        </div>
      )}
    </div>
  );
}