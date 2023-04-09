import "./App.css";
import logo from "./assets/logo512.png";

import Main from "./pages/Main";
import Page from "./pages/Page";
import NotFound from "./pages/NotFound";

import { Layout } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShareModel from "./pages/ShareModel";

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
      <Footer>
        {"Clipboard - By "}
        <a
          href="https://santoshpisini.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Santosh Pisini
        </a>
      </Footer>
    </Layout>
  );
}

export default App;
