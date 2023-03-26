import "./App.css";
import logo from "./assets/logo512.png";
import Main from "./pages/Main";

import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header className="header">
        <img src={logo} alt="Clipboard logo" className="header-logo" />
        <h1 className="header-title">Clipboard</h1>
      </Header>
      <Content className="content">
        <Main></Main>
      </Content>
      <Footer>Clipboard - By Santosh Pisini.</Footer>
    </Layout>
  );
}

export default App;
