import { Card, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const LoginCard = () => {
  const navigate = useNavigate();

  const IsUserLogged = () => {
    const user = !!sessionStorage.getItem("userLogged");
    return user;
  };

  const onFinish = (userData) => {
    sessionStorage.setItem("userLogged", JSON.stringify(userData));
    return IsUserLogged() ? navigate("/homepage") : navigate("/");
  };

  return (
    <Card title="Login at Stella" style={{ width: 300 }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginCard;
