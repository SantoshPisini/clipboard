import { Button, Modal } from "antd";
import { useState } from "react";

function InfoModel(props) {
  const [isModelOpen, setModelOpen] = useState(false);

  return (
    <div>
      <Button type="default" onClick={() => setModelOpen(true)}>
        Info
      </Button>
      <Modal
        title={"Page Info: " + props.info}
        centered
        open={isModelOpen}
        onOk={() => setModelOpen(false)}
        onCancel={() => setModelOpen(false)}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  );
}

export default InfoModel;
