import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
// assets/react.svg에서 reactLogo를 가져온다.
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [row, setRow] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("mount or updata");

    return () => {
      console.log("unmount");
    };
  });

  const htmlTitle = document.querySelector("title"); // <title> 태그 찾기
  htmlTitle.innerHTML = count;

  useEffect(() => {
    console.log("mount only");
    if (row.length === 0) {
      fetch(
        "http://openapi.seoul.go.kr:8088/6c5462437265686439375a52657474/json/RealtimeCityAir/1/25/"
      ).then(function (res2) {
        res2.json().then(function (res3) {
          setRow(res3.RealtimeCityAir.row);
        });
      });
    }
  }, []);
  // 배열의 의미는 업데이트의 감지이다.

  useEffect(() => {
    console.log("updata only", row);
  }, [row]);

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
      <button>로딩중</button>
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
            {row.map((gu, index) => {
              return (
                <tr key={index}>
                  <td>{gu.MSRSTE_NM}</td>
                  <td>{gu.PM10}</td>
                  <td>{gu.O3}</td>
                  <td>{gu.IDEX_NM}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

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
