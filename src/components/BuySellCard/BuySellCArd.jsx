import { Form, Input, Button, Checkbox, Card, Select, InputNumber } from "antd";
import { useRef, useState } from "react";
import "./style.scss";

const { Option } = Select;

const BuySellCard = ({ currencies }) => {
  const [totalBtc, setTotalBtc] = useState(2.5);
  const [curr, setCurr] = useState("BTC");
  const [buyDisabled, setBuyDisabled] = useState(false);
  const formRef = useRef();

  const isBtcSelected = curr === "BTC" || buyDisabled;
  const isSellDisabled = totalBtc <= 0 || !isBtcSelected;
  const maxValue = isBtcSelected ? totalBtc : null;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  function onChange(curr) {
    setCurr(curr);
    formRef.current.setFieldsValue({ value: "" });
    setBuyDisabled(true);
  }

  return (
    <Card title="Buy or sell your BTC" style={{ width: 400 }}>
      <p>Total BTC:{totalBtc}</p>
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="currency"
          name="currency"
          rules={[{ required: true, message: "Please input a value!" }]}
        >
          <Select
            showSearch
            placeholder="Choose currency..."
            defaultValue={curr}
            onChange={onChange}
          >
            <Option value="BTC">BTC</Option>
            {currencies?.map((curr, i) => (
              <Option key={curr + i} value={curr}>
                {curr}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Insert value"
          name="value"
          rules={[{ required: true, message: "Please input a value!" }]}
        >
          <InputNumber
            min={1}
            max={maxValue}
            precision={2}
            onChange={() => setBuyDisabled(false)}
          />
        </Form.Item>
        <div className="btn-container">
          <Form.Item>
            <Button
              type="primary"
              style={{ margin: "1rem" }}
              disabled={isBtcSelected}
              htmlType="submit"
            >
              Buy
            </Button>
            <Button
              danger
              style={{ margin: "1rem" }}
              disabled={isSellDisabled}
              htmlType="submit"
            >
              Sell
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default BuySellCard;
