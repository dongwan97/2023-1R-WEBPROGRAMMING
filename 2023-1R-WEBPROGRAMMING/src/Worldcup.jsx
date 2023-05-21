/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { useEffect, useState } from "react";
import 덴마크 from "./assets/덴마크.jpg";
import 독일 from "./assets/독일.jpg";
import 미국 from "./assets/미국.jpg";
import 베트남 from "./assets/베트남.jpg";
import 벨기에 from "./assets/벨기에.jpg";
import 스위스 from "./assets/스위스.jpg";
import 스페인 from "./assets/스페인.jpg";
import 영국 from "./assets/영국.jpg";
import 오스트리아 from "./assets/오스트리아.jpg";
import 이탈리아 from "./assets/이탈리아.jpg";
import 일본 from "./assets/일본.jpg";
import 체코 from "./assets/체코.jpg";
import 터키 from "./assets/터키.jpg";
import 포르투칼 from "./assets/포르투칼.jpg";
import 프랑스 from "./assets/프랑스.jpg";
import 헝가리 from "./assets/헝가리.jpg";

function Worldcup() {
  const candidate = [
    { name: "덴마크", src: 덴마크, description: "덴마크 설명" },
    { name: "독일", src: 독일, description: "독일 설명" },
    { name: "미국", src: 미국, description: "미국 설명" },
    { name: "베트남", src: 베트남, description: "베트남 설명" },
    { name: "벨기에", src: 벨기에, description: "벨기에 설명" },
    { name: "스위스", src: 스위스, description: "스위스 설명" },
    { name: "스페인", src: 스페인, description: "스페인 설명" },
    { name: "영국", src: 영국, description: "영국 설명" },
    { name: "오스트리아", src: 오스트리아, description: "오스트리아 설명" },
    { name: "이탈리아", src: 이탈리아, description: "이탈리아 설명" },
    { name: "일본", src: 일본, description: "일본 설명" },
    { name: "체코", src: 체코, description: "체코 설명" },
    { name: "터키", src: 터키, description: "터키 설명" },
    { name: "포르투칼", src: 포르투칼, description: "포르투칼 설명" },
    { name: "프랑스", src: 프랑스, description: "프랑스 설명" },
    { name: "헝가리", src: 헝가리, description: "헝가리 설명" },
  ];

  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]);
  const [description, setDescription] = useState("");
  //통계정보를 저장하는 state -> "덴마크" : 0 이런식으로 데이터가 저장될 예정이다.
  //초반에 카운트가 0임을 알려주기 위해 0으로 초기화
  const [stat, setStat] = useState({
    덴마크: 0,
    독일: 0,
    미국: 0,
    베트남: 0,
    벨기에: 0,
    스위스: 0,
    스페인: 0,
    영국: 0,
    오스트리아: 0,
    이탈리아: 0,
    일본: 0,
    체코: 0,
    터키: 0,
    포르투칼: 0,
    프랑스: 0,
    헝가리: 0,
  });
  const [sortedKeys, setSortedKeys] = useState([]);

  useEffect(() => {
    if (game.length > 1) {
      setSortedKeys(Object.keys(stat).sort((a, b) => stat[b] - stat[a]));
    }
  }, [stat, game]);
  useEffect(() => {
    if (game.length > 0) {
      setDescription("이미지 위에 표시될 내용");
    }
  }, [game]);

  const handleClick = () => {
    const name = game[round * 2].name;
    const description = candidate.find((c) => c.name === name).description;
    setDescription(description);
  };

  //처음 Worldcup 컴포넌트가 단 한번 실행하는 함수
  useEffect(() => {
    //시작할 때 브라우저 저장소에서 숫자로 변환한 월드컵 데이터를 가져온다.
    const 문자열 = localStorage.getItem("2020113297");
    if (문자열 !== null) {
      setStat(JSON.parse(문자열));
    }
    setGame(
      candidate
        .map((c) => {
          return { name: c.name, src: c.src, order: Math.random() };
        })
        .sort((l, r) => {
          return l.order - r.order;
        })
    );
  }, []);

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);

  if (game.length === 1) {
    //브라우저 저장소에 저장
    localStorage.setItem("2020113297", JSON.stringify(stat));
    return (
      <div>
        <h3>이상형 월드컵 우승</h3>
        <img src={game[0].src} />
        <p>{game[0].name}</p>
        <p>{stat[game[0].name]}번 승리</p>

        <table>
          {sortedKeys.map((name) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{stat[name]}</td>
              <td>
                <div
                  style={{
                    width: `${(stat[name] / game.length) * 100}%`,
                    height: "20px",
                    backgroundColor: "blue",
                  }}
                ></div>
              </td>
            </tr>
          ))}
        </table>

        {/* <table>
          {game.map((item) => {
            const name = item.name;
            const src = item.src;
            const win = stat[name];
            return (
              <tr key={name}>
                <td>
                  <img src={src} />
                </td>
                <td>{name}</td>
                <td>{win}</td>
              </tr>
            );
          })}
        </table> */}
      </div>
    );
  }

  if (game.length === 0 || round + 1 > game.length / 2)
    return <p>로딩중입니다.</p>;
  const left = round * 2,
    right = round * 2 + 1;
  console.log(stat);

  const leftFunction = () => {
    console.log("left Function");
    // ...stat , 배수지:7 이런식으로 하면 기존 stat에 배수지:7이 덮어씌워진다.
    setStat({ ...stat, [game[left].name]: stat[game[left].name] + 1 });
    // setStat((prevStat) => {
    //   prevStat[game[left].name] = prevStat[game[left].name] + 1;
    //   return prevStat;
    // });
    setNextGame((prev) => prev.concat(game[left]));
    setRound((round) => round + 1);
    handleClick(left);
  };

  const rightFunction = () => {
    setStat({ ...stat, [game[right].name]: stat[game[right].name] + 1 });
    // setStat((prevStat) => {
    //   prevStat[game[right].name] = prevStat[game[right].name] + 1;
    //   return prevStat;
    // });
    setNextGame((prev) => prev.concat(game[right]));
    setRound((round) => round + 1);
    handleClick(right);
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            contentAlign: "center",
            justifyContent: "center",

            backgroundColor: "rgba(0,0,0,0.5)",
            fontSize: "30px",
            fontWeight: "bold",
            position: "relative",
            left: 0,
            top: 150,
            zIndex: 4,
          }}
        >
          <p>
            가고싶은 여행지 이상형 월드컵 {round + 1}/{game.length / 2}
            <inline> </inline>
            <b>{game.length === 2 ? "결승" : game.length + "강"}</b>
          </p>{" "}
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  contentAlign: "center",
                  justifyContent: "center",

                  position: "relative",
                  top: 150,
                  zIndex: 4,
                  fontWeight: "bold",

                  fontSize: "30px",
                  textShadow: "2px 2px 2px black",
                }}
              >
                {game[left].name}
              </div>
            </div>
            <img
              src={game[left].src}
              onClick={() => {
                leftFunction();
              }}
            />
          </div>

          <div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  contentAlign: "center",
                  justifyContent: "center",

                  position: "relative",
                  top: 150,
                  zIndex: 4,
                  fontWeight: "bold",

                  fontSize: "30px",
                  textShadow: "2px 2px 2px black",
                }}
              >
                {game[right].name}
              </div>
            </div>
            <img
              src={game[right].src}
              onClick={() => {
                rightFunction();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Worldcup;
