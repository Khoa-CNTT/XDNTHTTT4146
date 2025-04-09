import { Layout } from "antd";
import HeaderBar from "../components/HeaderBar";
import CourseTable from "../components/CourseTable";

const { Content } = Layout;

const CourseManagement = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderBar />
      <Content style={{ margin: "24px 16px" }}>
        <h2>Course Management</h2>
        <CourseTable />
      </Content>
    </Layout>
  );
};

export default CourseManagement;
