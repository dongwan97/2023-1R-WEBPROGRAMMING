import { useState } from "react";
import reactLogo from "./assets/react.svg";
// assets/react.svg에서 reactLogo를 가져온다.
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [row, setRow] = useState([]);

  function handleButtonClick() {
    if (row.length === 0) {
      fetch(
        "http://openapi.seoul.go.kr:8088/6c5462437265686439375a52657474/json/RealtimeCityAir/1/25/"
      ).then(function (res2) {
        res2.json().then(function (res3) {
          setRow(res3.RealtimeCityAir.row);
        });
      });
    }
  }

  console.log(row);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + wandong</h1>
      <button onClick={handleButtonClick}>로딩중</button>
      {row.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>PM10</th>
              <th>O3</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {row.map(function (obj, index) {
              return (
                <tr key={index}>
                  <td>{obj.MSRSTE_NM}</td>
                  <td>{obj.PM10}</td>
                  <td>{obj.O3}</td>
                  <td>{obj.IDEX_NM}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
