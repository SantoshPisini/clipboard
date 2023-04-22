import { Button, Modal } from "antd";
import { useState } from "react";

function InfoModel(props) {
  const [isModelOpen, setModelOpen] = useState(false);
  const createOn = new Date(props?.info?.created_at)?.toLocaleString() || "";
  const modifiedOn = new Date(props?.info?.modified_at)?.toLocaleString() || "";
  return (
    <div>
      <Button type="default" onClick={() => setModelOpen(true)}>
        Info
      </Button>
      <Modal
        title={props.info?.title}
        centered
        open={isModelOpen}
        onOk={() => setModelOpen(false)}
        onCancel={() => setModelOpen(false)}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>Key: {props?.info?.key}</p>
        <p>Created on: {createOn}</p>
        <p>Modified on: {modifiedOn}</p>
        <p>
          Page size:{" "}
          {new TextEncoder().encode(props?.info?.content)?.length || ""} bytes
        </p>
      </Modal>
    </div>
  );
}

export default InfoModel;
