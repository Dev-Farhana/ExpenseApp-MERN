import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table } from "antd";
import { DeleteOutlined , PieChartOutlined ,TableOutlined  } from "@ant-design/icons";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [viewData, setViewData] = useState("table");

  //table data
  const column = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (record) => (
        <div>
          <DeleteOutlined
            className="mx-2 text-danger "
            onClick={() => {
              deleteHandler(record._id);
            }}
          />
        </div>
      ),
    },
  ];

  //useEffect Hook
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post(
          "http://localhost:8080/api/v1/transactions/get-transaction",
          {
            userid: user._id,
          }
        );
        setAllTransaction(res.data);
        setLoading(false);
      } catch (error) {
        message.error("Issue With Transaction");
        setLoading(false); 
      }
    };
    getAllTransactions();
  }, [setAllTransaction]);

  //delete handler
 const deleteHandler = async (id) => {
  try {
    setLoading(true);    
    await axios.delete(`http://localhost:8080/api/v1/transactions/${id}`);
     setLoading(false);
    message.success("Transaction Deleted!");
    setAllTransaction(
      allTransaction.filter((transaction) => transaction._id !== id)
    );
  } catch (error) {
    setLoading(false);
    console.log(error);
    message.error("Unable to delete transaction");
  }
 };


  // form handling
 const handleSubmit = async (values) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);
    await axios.post(
      "http://localhost:8080/api/v1/transactions/add-transaction",
      {
        ...values,
        userid: user._id,
      }
    );

    // Update state with the newly added transaction without fetching all transactions again
    setAllTransaction((prevTransactions) => [...prevTransactions, values]);
    setLoading(false);
    message.success("Transaction Added Successfully");
    setShowModal(false);
  } catch (error) {
    setLoading(false);
    message.error("Please fill all fields");
    console.log(error);
  }
 };


  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div className="filters d-flex align-items-center justify-content-evenly p-3 ">
          <div
            className="btn border rounded p-2 bg-danger-subtle fw-medium"
            onClick={() => setViewData("analytics")}
          >
            {" Graph Form"}
            <PieChartOutlined />
          </div>

          <div
            className="btn border rounded-2 p-2 bg-warning-subtle fw-medium"
            onClick={() => setViewData("table")}
          >
            {"Table Form"}
            <TableOutlined />
          </div>

          <div>
            <button
              className="btn btn-primary fw-medium"
              onClick={() => setShowModal(true)}
            >
              Add New{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="content" >
        {viewData === "table" ? (
          <Table
            columns={column}
            dataSource={allTransaction}
          />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
      </div>
      <Modal
        title={"Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="number" required />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" required />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;