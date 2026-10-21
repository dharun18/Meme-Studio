import { createContext, useContext } from "react";
import { STORAGE_KEYS } from "../constants/storage";
import { useLocalStorage } from "../hooks/useLocalStorage";

const MemeContext = createContext(null);

export function MemeProvider({ children }) {
  const [images, setImages] = useLocalStorage(STORAGE_KEYS.images, []);
  const [memes, setMemes] = useLocalStorage(STORAGE_KEYS.memes, []);

  const addImage = (image) =>
    setImages((prev) => [image, ...prev]);

  const deleteImage = (id) =>
    setImages((prev) => prev.filter((img) => img.id !== id));

  const addMeme = (meme) =>
    setMemes((prev) => [meme, ...prev]);

  const deleteMeme = (id) =>
    setMemes((prev) => prev.filter((m) => m.id !== id));

  const value = {
    images,
    memes,
    addImage,
    deleteImage,
    addMeme,
    deleteMeme,
  };

  return (
    <MemeContext.Provider value={value}>{children}</MemeContext.Provider>
  );
}

export function useMemeStore() {
  const ctx = useContext(MemeContext);
  if (!ctx) throw new Error("useMemeStore must be used inside <MemeProvider>");
  return ctx;
}