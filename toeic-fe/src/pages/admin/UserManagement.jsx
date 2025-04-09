import { Layout, Typography, Input, Card } from "antd";
import Sidebar from "../../components/layout/Sidebar";
import HeaderBar from "../../components/layout/HeaderBar";
import UserTable from "../../components/admin/UserTable";
import { useState } from "react";

const { Content } = Layout;
const { Title } = Typography;

const UserManagement = () => {
  const [search, setSearch] = useState("");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <Content style={{ margin: "24px 16px" }}>
          <Title level={2}>User Management</Title>

          <Card>
            <Input.Search
              placeholder="Tìm theo tên hoặc email..."
              onSearch={(value) => setSearch(value)}
              enterButton
            />
            <UserTable searchTerm={search} />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserManagement;
