import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";

import { Layout } from "antd";
import PrivateRoute from "./components/Routes/PrivateRoutes/PrivateRoute";
import HomePage from "./components/Pages/HomePage/HomePage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import NotFound from "./components/Pages/404/NotFound";
const { Header, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/homepage" element={<HomePage />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer className="footer">
        <p>Stella</p>
      </Footer>
    </Layout>
  );
}

export default App;
