import "./App.css";
import logo from "./assets/logo512.png";

import Main from "./pages/Main";
import Page from "./pages/Page";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ShareModel from "./models/ShareModel";

import { Layout } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const { Header, Footer, Content } = Layout;

// TODO: Add tabs
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Main,
    },
    {
      path: "page/:pageId",
      element: <Page />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "*",
      Component: NotFound,
    },
  ]);
  return (
    <Layout>
      <Header className="header">
        <div className="header-title">
          <img src={logo} alt="Clipboard logo" className="header-logo" />
          <h1>Clipboard</h1>
        </div>
        <ShareModel></ShareModel>
      </Header>
      <Content className="content">
        <RouterProvider router={router} />
      </Content>
      <Footer className="footer">
        <span>
          {"Clipboard - By "}
          <a
            href="https://santoshpisini.github.io?utm_medium=personal-apps&utm_source=clipboard&utm_content=footer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Santosh Pisini
          </a>
        </span>
        <a href={`/about`}>About</a>
      </Footer>
    </Layout>
  );
}

export default App;
