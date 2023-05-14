import React from "react";
import ReactDOM from "react-dom/client";
// App.jsx라는 파일에서 App을 가져온다.
import "./index.css";
import Worldcup from "./Worldcup.jsx";

// ReactDOM.createRoot는 리액트를 실행하는 함수입니다.
// .render는 App을 실행하는 함수입니다.
// root라는 태그를 찾아서 App을 넣어주세요.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Worldcup />
  </React.StrictMode>
);
