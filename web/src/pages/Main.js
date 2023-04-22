import "./Main.css";
import image_one from "../assets/svg/1.svg";
import image_two from "../assets/svg/2.svg";
import image_three from "../assets/svg/3.svg";
import image_four from "../assets/svg/4.svg";
import image_five from "../assets/svg/5.svg";
import landing_one from "../assets/svg/landing_1.svg";
import landing_two from "../assets/svg/landing_2.svg";
import PageService from "../services/PageService";

import { Button, Carousel, Divider, Input, message } from "antd";
import { FileAddOutlined, FileSyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Main() {
  const navigate = useNavigate();
  const PAGE_ID_REGEX = "^[a-z0-9_.-]*$";
  const [value, setValue] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <div className="landing-container">
        <div className="landing-images deskop">
          <Carousel autoplay>
            <img className="landing-image" src={image_one} alt="" />
            <img className="landing-image" src={image_two} alt="" />
            <img className="landing-image" src={image_three} alt="" />
            <img className="landing-image" src={image_four} alt="" />
            <img className="landing-image" src={image_five} alt="" />
          </Carousel>
        </div>
        <div className="deskop">
          <Divider type="vertical" style={{ height: "100%" }} />
        </div>
        <div className="landing-form">
          <img
            className="landing-form-image"
            src={new Date().getMinutes() % 2 === 0 ? landing_one : landing_two}
            alt=""
          />
          <Input
            placeholder="Enter your page id here..."
            maxLength={10}
            value={value || ""}
            onChange={(v) => {
              setValue(v.target?.value?.trim()?.toLowerCase() || "");
            }}
            onKeyPress={(event, v) => {
              if (event.key === "Enter") {
                setValue(event.target?.value?.trim()?.toLowerCase() || "");
                openPage();
              }
            }}
            style={{ marginBottom: "16px" }}
          />
          <Button
            type="primary"
            icon={<FileSyncOutlined />}
            size="large"
            onClick={() => {
              openPage();
            }}
          >
            Open page
          </Button>
          <Divider>OR</Divider>
          <Button
            type="default"
            icon={<FileAddOutlined />}
            size="large"
            onClick={() => {
              navigate("/page/NEW");
            }}
          >
            Get started with 'New Page'
          </Button>
        </div>
      </div>
    </>
  );

  async function openPage() {
    if (new RegExp(PAGE_ID_REGEX).test(value) && value.length > 1) {
      try {
        await PageService.getPageByKey(value);
        navigate(`/page/${value}`);
      } catch (error) {
        messageApi.open({
          type: "error",
          duration: 4800,
          content:
            error.response.status === 404
              ? value +
                " page not found! Please check the page id and try again!"
              : "Unable to load page at this moment! Please try again later.",
        });
      }
    } else {
      messageApi.open({
        type: "error",
        content: "Please enter a valid page Id.",
      });
    }
  }
}

export default Main;
