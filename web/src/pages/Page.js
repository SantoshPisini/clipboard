import "./Page.css";

import InfoModel from "./InfoModel";
import PageService from "../services/PageService";

import { Progress, Button, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// TODO: Add tabs
function Page() {
  let isInitialized = false;

  const MAX_LIMIT = 13 * 1024 * 1024;
  const params = useParams();
  const navigate = useNavigate();
  const pageId = params.pageId?.toLowerCase();

  const [value, setValue] = useState("");
  const [pageData, setPageData] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [storageValue, setStorageValue] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

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
          : await PageService.updatePage(
              Object.assign(pageData, { content: value })
            );
      onValueChange(resposne?.content);
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Something went wrong! Please try again later.",
      });
    } finally {
      setIsSyncing(false);
    }
  };
  const fetchPageData = async () => {
    try {
      const response = await PageService.getPageByKey(pageId);
      setPageData(response?.data);
      onValueChange(response?.data.content);
    } catch (error) {
      setTimeout(() => {
        navigate(`/`);
      }, 5000);
      messageApi.open({
        type: "error",
        duration: 4800,
        content:
          error.response.status === 404
            ? "Page not found! Please check the page id and try again!"
            : "Unable to load page at this moment! Please try again later.",
      });
    }
  };
  useEffect(() => {
    if (pageId !== "new" && !isInitialized) {
      isInitialized = true;
      fetchPageData();
    }
  }, []);
  return (
    <div>
      {contextHolder}
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
        <InfoModel info={pageData}></InfoModel>
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
