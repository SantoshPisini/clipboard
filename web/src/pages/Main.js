import "./Main.css";

import { Progress, Button } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// TODO: Add tabs
function Main() {
  const MAX_LIMIT = 10 * 1024 * 1024;

  const [value, setValue] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [storageValue, setStorageValue] = useState(0);
  const modules = {
    // syntax: {
    //   highlight: (text: string) => hljs.highlightAuto(text).value,
    // },
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { align: [] },
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { color: [] },
        { background: [] },
      ],
      ["link", "image", "video", "code", "blockquote"],
      [{ script: "sub" }, { script: "super" }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
    syntax: false,
  };
  const formats = [
    "font",
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "background",
    "color",
    "script",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "clean",
    "code",
    "indent",
    "list",
    "align",
  ];

  const onValueChange = (v) => {
    setValue(v);
    const valueSize = new TextEncoder().encode(v).length;
    const percentage = Math.ceil((valueSize / MAX_LIMIT) * 100);
    setStorageValue(percentage);
  };

  const sync_page = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <div>
      <div className="card-header">
        <Progress
          className="card-header-progress"
          percent={storageValue}
          status="active"
        />
        <Button
          type="primary"
          loading={isSyncing}
          onClick={sync_page}
          disabled={storageValue > 99.999}
        >
          Sync
        </Button>
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onValueChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default Main;
