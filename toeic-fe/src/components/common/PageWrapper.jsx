import { Layout } from "antd";
import Sidebar from "../layout/Sidebar";
import HeaderBar from "../layout/HeaderBar";

const { Content } = Layout;

const PageWrapper = ({ children }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Sidebar />
    <Layout>
      <HeaderBar />
      <Content style={{ margin: "24px 16px" }}>{children}</Content>
    </Layout>
  </Layout>
);

export default PageWrapper;
