import "./Page.css";

import InfoModel from "./InfoModel";

import { Progress, Button, Spin } from "antd";
import { useState } from "react";
import { useParams } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PageService from "../services/PageService";

// TODO: Add tabs
function Page() {
  const MAX_LIMIT = 13 * 1024 * 1024;

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

  const sync_page = async () => {
    try {
      setIsSyncing(true);
      const resposne =
        pageId === "new"
          ? await PageService.createPage({
              content: value,
              title: "Untitled",
            })
          : null;
      console.log(resposne);
      onValueChange(resposne.content);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };
  const params = useParams();
  const pageId = params.pageId?.toLowerCase();

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
          {pageId === "new" ? "Save New Page" : "Sync"}
        </Button>
        <InfoModel info={2}></InfoModel>
      </div>
      <Spin spinning={isSyncing} size="large">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onValueChange}
          modules={modules}
          formats={formats}
        />
      </Spin>
    </div>
  );
}

export default Page;
