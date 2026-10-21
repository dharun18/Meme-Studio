import { useRef } from "react";
import Button from "./Button";

export default function UploadButton({ label, multiple = false, onFiles }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) onFiles(files);
    e.target.value = "";
  };

  return (
    <>
      <Button variant="ghost" onClick={() => inputRef.current?.click()}>
        {label}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        hidden
        onChange={handleChange}
      />
    </>
  );
}