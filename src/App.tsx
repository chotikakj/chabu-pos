import { useState } from "react";
import Routes from "./routes";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Loading from "./utils/loading";
import { ConfigProvider } from "antd";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(false);

  axios.interceptors.request.use(
    async function (config) {
      setLoading(true);
      let token = await localStorage.getItem("TOKEN");
      if (token) {
        config.headers = {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
        };
        
        return config;
      }
      return config;
    },
    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      setLoading(false);
      return response;
    },
    async function (error) {
      setLoading(false);
      const token = localStorage.getItem("TOKEN");
      const decode: any = jwtDecode(String(token));
      if (error.response) {
        if (error.response.data.error === "Unauthorized") {
          localStorage.clear();
          window.location.href = "/";
        }
      }
      const expirationTime = decode.exp * 1000;
      const isExpired = expirationTime < Date.now();
      if (isExpired) {
        localStorage.clear();
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );

  return (
    <>
      <Loading open={loading} />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#d9363e",
            colorBgContainer: "#ffffff",
            fontFamily: "'IBM Plex Sans Thai', Helvetica, Arial, sans-serif",
            boxShadow: "rgba(76, 78, 100, 0.22) 0px 2px 10px 0px",
            colorText: "rgb(0, 0, 0)",
            borderRadius: 5,
          },
        }}
      >
        <Routes />
      </ConfigProvider>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
