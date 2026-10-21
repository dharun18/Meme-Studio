import TabSwitcher from "./TabSwitcher";
import "./Header.css";

export default function Header({ activeTab, onChange, memeCount, imageCount }) {
  const tabs = [
    { id: "editor", label: "Editor" },
    { id: "gallery", label: `Gallery (${memeCount})` },
    { id: "images", label: `Images (${imageCount})` },
  ];

  return (
    <header className="header">
      <h1>🎨 Meme Studio</h1>
      <TabSwitcher activeTab={activeTab} onChange={onChange} tabs={tabs} />
    </header>
  );
}