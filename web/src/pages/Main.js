import "./Main.css";
import image_one from "../assets/svg/1.svg";
import image_two from "../assets/svg/2.svg";
import image_three from "../assets/svg/3.svg";
import image_four from "../assets/svg/4.svg";
import image_five from "../assets/svg/5.svg";
import landing_one from "../assets/svg/landing_1.svg";
import landing_two from "../assets/svg/landing_2.svg";
import PageService from "../services/PageService";

import { Button, Carousel, Divider, Input, message, Spin } from "antd";
import { FileAddOutlined, FileSyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Main() {
  const navigate = useNavigate();
  const PAGE_ID_REGEX = "^[a-z0-9_.-]*$";
  const [value, setValue] = useState("");
  const [inputError, setinputError] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [startServer, setStartServer] = useState(false);
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
          <Spin spinning={isSyncing} size="large">
            <Input
              placeholder="Enter your page id here..."
              maxLength={10}
              value={value || ""}
              allowClear
              status={inputError === "" ? "" : "error"}
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
            {inputError === "" ? (
              ""
            ) : (
              <p style={{ color: "red", margin: "0px 0px 8px 0px" }}>
                {inputError}
              </p>
            )}
            <div className="action-bar">
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
              <Button
                type="default"
                icon={<FileAddOutlined />}
                size="large"
                onClick={() => {
                  openPage(true);
                }}
              >
                New Page
              </Button>
            </div>
          </Spin>
          {startServer && isSyncing ? (
            <p>Please wait backend server is starting... :)</p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );

  async function openPage(isNewPage = false) {
    setIsSyncing(true);
    setTimeout(() => {
      setStartServer(true);
    }, 5000);
    if (new RegExp(PAGE_ID_REGEX).test(value) && value.length > 1) {
      try {
        const response = await PageService.getPageByKey(value);
        setIsSyncing(false);
        if (isNewPage && response) {
          messageApi.open({
            type: "info",
            duration: 3000,
            content:
              "Page already exists! Please try creating with new page id or try to 'Open page'.",
          });
          setinputError("");
        }
        !isNewPage && navigate(`/page/${value}`);
      } catch (error) {
        // Create page case
        if (isNewPage && error.response.status === 404) {
          await createPage();
        } else {
          setIsSyncing(false);
          messageApi.open({
            type: "error",
            duration: 3000,
            content:
              error.response.status === 404
                ? value +
                  " page not found! Please check the page id and try again!"
                : "Unable to load page at this moment! Please try again later.",
          });
          setinputError(
            error.response.status === 404
              ? value +
                  " page not found! Please check the page id and try again!"
              : "Unable to load page at this moment! Please try again later."
          );
        }
      }
    } else {
      setIsSyncing(false);
      setinputError(
        isNewPage
          ? `Please enter a new page Id(any text) to get started.`
          : "Please enter a valid page id."
      );
    }
  }

  async function createPage() {
    await PageService.createPage({
      content: "",
      title: "Untitled",
      key: value,
    })
      .then((_) => {
        messageApi.open({
          type: "success",
          duration: 2000,
          content: "Successfully created new page with id: " + value,
        });
        setTimeout(() => {
          setIsSyncing(false);
          navigate(`/page/${value}`);
        }, 2100);
      })
      .finally(() => {
        setIsSyncing(false);
      });
  }
}

export default Main;
