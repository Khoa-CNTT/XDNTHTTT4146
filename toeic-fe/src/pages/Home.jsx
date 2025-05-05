import React from "react";
import { Link } from "react-router-dom";
import CustomCard from "../components/CustomCard";

import {
  Input,
  Button,
  Row,
  Col,
  Card,
  Typography,
  Avatar,
  Divider,
} from "antd";
import {
  SearchOutlined,
  TrophyOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={{ width: "100%", overflowX: "hidden", background: "#f0f2f5" }}>
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
        {/* Search Bar */}
        <div style={{ marginBottom: 32 }}>
          <Input.Search
            placeholder="Tìm kiếm..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            style={{
              width: "100%",
              maxWidth: 500,
              margin: "0 auto",
              display: "block",
            }}
            onSearch={(value) => console.log("Searching:", value)}
          />
        </div>

        {/* Intro Section */}
        <Row gutter={[32, 32]} align="middle" justify="center">
          <Col xs={24} md={12}>
            <CustomCard
              style={{ backgroundColor: "#08979c", color: "#fff" }}
              bodyStyle={{ color: "#fff" }}
            >
              <Title level={3} style={{ color: "#fff" }}>
                Conquer TOEIC with Exciting New Learning Experiences!
              </Title>
              <Paragraph style={{ color: "#fff" }}>
                Explore Vocabulary Garden, where you can plant and nurture a
                thriving vocabulary garden, making it easier and more effective
                to retain vocabulary.
              </Paragraph>
            </CustomCard>
          </Col>
          <Col xs={24} md={12}>
            <img
              src="/avatar_linhvat.jpg"
              alt="Banner"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </Col>
        </Row>

        {/* Start Button */}
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <Link to="/login">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              style={{
                backgroundColor: "#08979c",
                borderColor: "#08979c",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              START HERE
            </Button>
          </Link>
        </div>

        {/* Features */}
        <Row gutter={[24, 24]} justify="center">
          {[
            { title: "VOCABULARY GARDEN", image: "/garden.png" },
            { title: "CLIMB THE 7-LEVEL TOWER", image: "/tower.png" },
            { title: "TOEIC MINI-GAME", image: "/minigame.png" },
          ].map((item, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.title}
                    src={item.image}
                    style={{ height: 180, objectFit: "contain", padding: 16 }}
                  />
                }
                style={{ textAlign: "center", borderRadius: 12 }}
              >
                <Title level={4}>{item.title}</Title>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Leaderboard Section */}
        <div style={{ marginTop: 64 }}>
          <Card>
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} md={6} style={{ textAlign: "center" }}>
                <Avatar
                  size={96}
                  src="/trophy.png"
                  icon={<TrophyOutlined />}
                  style={{ backgroundColor: "#ffc53d" }}
                />
              </Col>
              <Col xs={24} md={18}>
                <Title level={4}>How competitive are you?</Title>
                <Paragraph>
                  Track your progress and challenge friends to climb to the top!
                </Paragraph>
                <Divider />
                <Title level={5}>Top winners of the week</Title>
                <Row gutter={[16, 16]}>
                  {["ABC", "DEF", "IKM"].map((name, idx) => (
                    <Col key={idx} xs={24} sm={8}>
                      <Card>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <Avatar icon={<UserOutlined />} />
                          <div>
                            <span>{name}</span>
                            <br />
                            <small>{idx + 1}st place</small>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
