import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Pages/LoginPage/LoginPage";

import NotFound from "./components/Pages/404/NotFound";
import { Layout } from "antd";
import HomePage from "./components/Pages/HomePage/HomePage";
import PrivateRoute from "./components/Routes/PrivateRoutes/PrivateRoute";

import axios from "axios";
import "./App.scss";

const { Header, Footer } = Layout;

function App() {
  useEffect(() => {
    const getData = axios.get("https://blockchain.info/ticker").then((res) => {
      console.log(res);
    });
  }, []);
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
