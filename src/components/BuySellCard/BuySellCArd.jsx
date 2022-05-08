import { Form, Button, Card, Select, InputNumber, Col, Row } from "antd";
import axios from "axios";
import { useRef, useState } from "react";
import "./style.scss";

const { Option } = Select;

const BuySellCard = ({ currencies }) => {
  const [totalBtc, setTotalBtc] = useState(2.5);
  const [curr, setCurr] = useState(undefined);

  const formRef = useRef();

  const basePath = "https://blockchain.info/tobtc?&cors=true&";
  const maxValue = curr === "BTC" ? totalBtc : null;
  const precision = curr === "BTC" ? 8 : 2;
  const isCurrBtc = curr === "BTC";

  const onFinish = async (datas) => {
    let total = totalBtc;
    if (datas.currency === "BTC") {
      onSellBtc(datas, total);
    } else {
      onBuyBtc(datas, total);
    }
    formRef.current.resetFields();
    setCurr(undefined);
  };

  function onChange(curr) {
    setCurr(curr);
    formRef.current.setFieldsValue({ value: "" });
  }

  const onBuyBtc = async (datas, total) => {
    const searchParams = new URLSearchParams(datas);
    const data = await axios
      .get(`${basePath}${searchParams}`.toString())
      .then((r) => {
        setTotalBtc(Number((total += r.data)));
      });
  };

  const onSellBtc = async (datas, total) => {
    const res = datas.value < totalBtc ? (total -= datas.value) : 0;
    setTotalBtc(res);
  };

  return (
    <Card title="Buy or sell your BTC" style={{ width: 400 }}>
      <p>Total BTC:{totalBtc}</p>
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        initialValues={{ value: "" }}
      >
        <Form.Item
          label="currency"
          name="currency"
          rules={[{ required: true, message: "Please input a value!" }]}
        >
          <Select
            showSearch
            placeholder="Choose currency..."
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
            precision={precision}
            disabled={isCurrBtc && totalBtc === 0}
          />
        </Form.Item>

        <Form.Item className="btn-container">
          <Row>
            <Col span={8}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!curr || isCurrBtc}
              >
                Buy
              </Button>
            </Col>
            <Col span={8}>
              <Button danger htmlType="submit" disabled={!isCurrBtc}>
                Sell
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BuySellCard;
