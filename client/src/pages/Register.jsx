import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner  from "../components/Spinner";

const Register = () => {
   const navigate = useNavigate();
   const[loading, setLoading] = useState(false);

    const submitHandler = async(values) => {
      try {
      setLoading(true)
      await axios.post(
          "http://localhost:8080/api/v1/users/register",
          values
        );
        message.success("Registeration Successful");
        setLoading(false);
        navigate("/login");
      } catch (error) {
        console.log("Err" , error);
        setLoading(false);
        message.error("Registeration Failed");
      }
    //  console.log ('Success:', values);
    };
    
    useEffect(()=>{
      if(localStorage.getItem("user")){
        navigate("/")
      }
    }, [navigate]);
  return (
    <>
    <div className="register-page d-flex align-items-center justify-content-center ">
      {loading && <Spinner />}
      <Form layout="vertical" onFinish={submitHandler}>
        <h3> Registeration Form!</h3>
        <Form.Item
          label="Username"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <div className="d-flex">
          <Link to="/login">Already Registered ? click here to Login!</Link>
        </div>
      </Form>
    </div>
     </>
  );
}

export default Register;