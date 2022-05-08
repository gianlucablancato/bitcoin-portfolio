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
  const path = "https://blockchain.info/ticker";

  const getDailyQuotation = async () => {
    const data = await axios.get(path).then((r) => setDailyValues(r));
  };

  useEffect(() => {
    setUserLogged(sessionStorage.getItem("userLogged"));
    getDailyQuotation();
  }, []);

  return (
    <div className="homepage-container">
      <Row className="row-homepage">
        <Col>
          <h1>Welcome {name}</h1>
        </Col>
      </Row>
      <Row className="row-homepage">
        <Col className="buySell-card-container">
          <BuySellCard currencies={currencies} />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
