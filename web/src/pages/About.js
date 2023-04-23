import "./About.css";

import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  return (
    <div className="main-about-container">
      <Button
        type="primary"
        shape="round"
        icon={<HomeOutlined />}
        size="middle"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
      <h1>Important Information</h1>
      <p>
        Any one with the page id can access the page with out any
        authentication, hence I would strongly recommend to use this tool with
        due diligence.
      </p>
      <p className="imp-text">
        DO NOT 🚫 use it for unethical or illegal activites.
      </p>
      <h1>Inspiration</h1>
      <p>
        As a software engineer 🧑‍💻, I work with different computers of different
        configurations, and I want to copy some text to another machine.
        Currently, I use OneNote, which is very hectic as I need to log in to
        the same account to perform this action.
      </p>
      <h1>Introduction</h1>
      <p>
        Developing Clipboard[Better name is required LOL!] a primarily browser
        extension[Will be available in store soon ✌️] that acts as a clipboard.
        We also have a web based clipboard as an alternative to use on mobile
        devices.
      </p>
      <h1>Contact</h1>
      <p>
        Thank you for using my app 🙏! I hope that you are enjoying your
        experience so far. I would like to hear your feedback about the app to
        help me improve and make it even better for you.
      </p>
      <p>
        If you have any comments, suggestions, or concerns, please do not
        hesitate to reach out via email at{" "}
        <a
          href="mailto:santosh_pisini@outlook.com"
          target="_blank"
          rel="noreferrer"
        >
          santosh_pisini@outlook.com
        </a>
        . I appreciate any feedback you can give me, as it will help me to
        continue providing you with the best possible experience.
      </p>
      <p>Thank you for your support and for choosing my app!</p>
      <span>Best regards,</span>
      <br></br>
      <a
        href="https://santoshpisini.github.io?utm_medium=personal-apps&utm_source=clipboard&utm_content=about"
        target="_blank"
        rel="noopener noreferrer"
      >
        Santosh Pisini
      </a>
    </div>
  );
}
export default About;
