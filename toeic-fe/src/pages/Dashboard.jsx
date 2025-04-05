import { Layout, Card, Row, Col, Table } from "antd";
import Sidebar from "../components/layout/Sidebar";
import HeaderBar from "../components/layout/HeaderBar";

const { Content } = Layout;

const leaderboardData = [
  {
    key: "1",
    name: "Alice Nguyen",
    score: 980,
    rank: 1,
  },
  {
    key: "2",
    name: "John Tran",
    score: 950,
    rank: 2,
  },
  {
    key: "3",
    name: "Linh Pham",
    score: 910,
    rank: 3,
  },
  {
    key: "4",
    name: "Minh Le",
    score: 890,
    rank: 4,
  },
];

const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
    width: 80,
    sorter: (a, b) => a.rank - b.rank,
  },
  {
    title: "Student Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    sorter: (a, b) => a.score - b.score,
  },
];

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <Content style={{ margin: "24px 16px" }}>
          <h2>Admin Dashboard</h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card title="Total Students" bordered>
                1200
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card title="Active Courses" bordered>
                8
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card title="Reports Today" bordered>
                15
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card title="Completion Rate" bordered>
                76%
              </Card>
            </Col>
          </Row>

          <Card
            title="Top Students Leaderboard"
            style={{ marginTop: 24 }}
            bordered
          >
            <Table
              dataSource={leaderboardData}
              columns={columns}
              pagination={false}
              rowClassName={(record, index) =>
                index === 0
                  ? "gold-row"
                  : index === 1
                  ? "silver-row"
                  : index === 2
                  ? "bronze-row"
                  : ""
              }
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
