import { Table, Tag } from "antd";
import QuestionAction from "./QuestionAction";

const QuestionTable = ({ questions }) => {
  const columns = [
    {
      title: "Question",
      dataIndex: "content",
      key: "content",
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
    {
      title: "Part",
      dataIndex: "part",
      key: "part",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "blue" : "red"}>
          {status === "active" ? "Active" : "Hidden"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => <QuestionAction question={record} />,
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={questions}
      columns={columns}
      pagination={{ pageSize: 8 }}
    />
  );
};

export default QuestionTable;
