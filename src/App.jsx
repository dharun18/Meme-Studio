import { useState } from "react";
import { useMemeStore } from "./context/MemeContext";
import Header from "./components/layout/Header";
import Editor from "./components/editor/Editor";
import Gallery from "./components/gallery/Gallery";
import Images from "./components/images/Images";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("editor");
  const { memes, images } = useMemeStore();

  return (
    <div className="app">
      <Header
        activeTab={activeTab}
        onChange={setActiveTab}
        memeCount={memes.length}
        imageCount={images.length}
      />

      <main className="main">
        {activeTab === "editor" && <Editor />}
        {activeTab === "gallery" && <Gallery />}
        {activeTab === "images" && <Images />}
      </main>
    </div>
  );
}