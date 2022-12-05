import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function onFinish(values) {
    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("data", data);
    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login Succesfull");
      navigate("/dashboard");
    } else {
      alert("sorry");
    }
  }

  const onFinishFailed = (errorInfo) => {
    alert("failed");
  };
  return (
    <div>
      <h1>Login</h1>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
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
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Button type="primary" htmlType="submit" value="Login">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
