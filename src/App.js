import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Button, Layout } from "antd";
import PrivateRoute from "./components/Routes/PrivateRoutes/PrivateRoute";
import HomePage from "./components/Pages/HomePage/HomePage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import NotFound from "./components/Pages/404/NotFound";
import "./App.scss";

const { Header, Footer } = Layout;

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location.pathname);
  const isHomepage = location.pathname === "/homepage";

  const onClickLogout = () => {
    sessionStorage.removeItem("userLogged");
    navigate("/");
  };
  return (
    <Layout>
      <Header>
        {isHomepage && (
          <Button title="Logout" type="primary" onClick={onClickLogout}>
            Logout
          </Button>
        )}
      </Header>
      <Routes>
        <Route index element={<LoginPage />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/homepage" element={<HomePage />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer className="footer">
        <p>Stella</p>
      </Footer>
    </Layout>
  );
}

export default App;
