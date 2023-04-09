import { Button, Modal, QRCode, message } from "antd";
import { useState } from "react";

import { ShareAltOutlined } from "@ant-design/icons";

function ShareModel() {
  const [isModelOpen, setModelOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <div>
        <Button
          type="primary"
          shape="circle"
          icon={<ShareAltOutlined />}
          size="large"
          onClick={(e) => {
            e.preventDefault();
            setModelOpen(true);
          }}
        />
        <Modal
          title={"Share"}
          centered
          open={isModelOpen}
          onOk={() => {
            navigator.clipboard.writeText(window.location.href.trim());
            messageApi.open({
              type: "success",
              content: "Successfully copied clipboard.",
            });
            setModelOpen(false);
          }}
          okText="Copy to Clipboard"
          onCancel={() => setModelOpen(false)}
          cancelText="Close"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <QRCode value={window.location.href} icon="../assets/logo512.png" />
            <p>{window.location.href}</p>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ShareModel;
