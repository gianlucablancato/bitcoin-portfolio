import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import BuySellCard from "../../BuySellCard/BuySellCArd";
import "./style.scss";

const HomePage = () => {
  const [userLogged, setUserLogged] = useState(false);
  const [dailyValues, setDailyValues] = useState();

  const name = JSON.parse(userLogged).username;

  const currencies = dailyValues && Object.keys(dailyValues.data);

  const getDailyQuotation = async () => {
    const data = await axios
      .get("https://blockchain.info/ticker")
      .then((r) => setDailyValues(r));
  };

  useEffect(() => {
    setUserLogged(sessionStorage.getItem("userLogged"));
    getDailyQuotation();
  }, []);

  return (
    <div className="homepage-container">
      <Row className="row-homepage">
        <Col span={24}>
          <h1>Welcome {name}</h1>
        </Col>
      </Row>
      <Row className="row-homepage">
        <Col span={12} className="buySell-card-container">
          <BuySellCard currencies={currencies} />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
