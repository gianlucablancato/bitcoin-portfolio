import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../LoginCard/LoginCard";
import "./style.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const isUserLogged = sessionStorage.getItem("userLogged");

  useEffect(() => {
    isUserLogged && navigate("/homepage");
  }, []);

  return (
    <div className="loginPage-container">
      <LoginCard />
    </div>
  );
};

export default LoginPage;
