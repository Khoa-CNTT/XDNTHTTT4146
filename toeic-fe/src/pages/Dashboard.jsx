// pages/AdminDashboard.js
import { Layout, Row, Col, Card, Typography } from "antd";
import Sidebar from "../components/layout/Sidebar";
import HeaderBar from "../components/admin/HeaderBar";
import StatsCard from "../components/admin/StatsCard";
import LeaderboardTable from "../components/admin/LeaderboardTable";

const { Content } = Layout;
const { Title } = Typography;

const leaderboardData = [
  { key: "1", name: "Alice Nguyen", score: 980, rank: 1 },
  { key: "2", name: "John Tran", score: 950, rank: 2 },
  { key: "3", name: "Linh Pham", score: 910, rank: 3 },
  { key: "4", name: "Minh Le", score: 890, rank: 4 },
];

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <Content style={{ margin: "24px 16px" }}>
          <Title level={2}>Admin Dashboard</Title>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <StatsCard title="Total Students" value="1200" />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StatsCard title="Active Courses" value="8" />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StatsCard title="Reports Today" value="15" />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StatsCard title="Completion Rate" value="76%" />
            </Col>
          </Row>

          <Card
            title="Top Students Leaderboard"
            style={{ marginTop: 24 }}
            bordered
          >
            <LeaderboardTable data={leaderboardData} />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
