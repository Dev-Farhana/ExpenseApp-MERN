import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link ,useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) =>{
    try {
      setLoading(true);
      const {data} =  await axios.post("http://localhost:8080/api/v1/users/login" , values);
      setLoading(false);
      message.success("Login Successful!");
      localStorage.setItem("user" , JSON.stringify({...data , password: " "}))
      navigate("/");
    } catch (error) {
      message.error("Login not Successful :/" , error);
      setLoading(false);
      console.log("Err==> ", error);      
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("user")){
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register-page d-flex align-items-center justify-content-center ">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h3> Kindly Login Here!</h3>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
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
                message: "Please input your Password!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <button className="btn btn-primary"> Submit </button>
          <div className="d-flex">
            <Link to="/register"> Not a User ? click here to Register!</Link>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;