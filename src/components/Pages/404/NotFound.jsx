import { useNavigate } from "react-router-dom";
import "./style.scss";

const NotFound = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 2000);
  return (
    <div className="not-found-container">
      <h1>Page Not Found 404! Redirect to login in a few seconds...</h1>
    </div>
  );
};

export default NotFound;
