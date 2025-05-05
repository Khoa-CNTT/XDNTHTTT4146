import React, { useState } from "react";
import { Layout, Button, Space, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ReusableTable from "../components/ReusableTable";

const { Content } = Layout;

const CourseManagement = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([
    {
      key: "1",
      name: "Course 1",
      teacher: "Teacher 1",
      startDate: "2025-06-01",
    },
    {
      key: "2",
      name: "Course 2",
      teacher: "Teacher 2",
      startDate: "2025-07-15",
    },
    {
      key: "3",
      name: "Course 3",
      teacher: "Teacher 3",
      startDate: "2025-08-20",
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleEdit = (key) => {
    console.log(`Editing course with key: ${key}`);
  };

  const columns = [
    {
      title: t("course_name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("teacher"),
      dataIndex: "teacher",
      key: "teacher",
      sorter: (a, b) => a.teacher.localeCompare(b.teacher),
    },
    {
      title: t("course_start_date", "Start Date"),
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    },
    {
      title: t("actions", "Actions"),
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.key)}
          />
          <Popconfirm
            title={t("delete_course_confirm")}
            onConfirm={() => handleDelete(record.key)}
            okText={t("yes")}
            cancelText={t("no")}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "24px 16px" }}>
        <h2>{t("manage_courses")}</h2>
        <Button type="primary" style={{ marginBottom: 16 }}>
          {t("add_course")}
        </Button>
        <ReusableTable
          dataSource={data}
          columns={columns}
          onDelete={handleDelete}
          onEdit={handleEdit}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </Content>
    </Layout>
  );
};

export default CourseManagement;
