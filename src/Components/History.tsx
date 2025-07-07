import { nanoid } from "@reduxjs/toolkit";
import React from "react";

type HistoryItem = {
  date: string;
  WPM: number;
  correctChars: number;
  wrongChars: number;
  totalCharTyped: number;
  accuracy: number;
  correctWords: number;
  wrongWords: number;
  wrongWordsData?: string[];
};

type HistoryProps = {
  data: HistoryItem[];
};

const History: React.FC<HistoryProps> = ({ data }) => {
  const formatDate = (timestamp: number): string => {
    const d = new Date(timestamp);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <section style={{ margin: "20px 0px" }}>
      <h2>History</h2>
      {!data || data.length === 0 ? (
        <section className="otherContainer">
          <p>No history yet.</p>
        </section>
      ) : (
        data.map((item: HistoryItem, inx: number) => {
          const output = item.wrongWordsData
            ? item.wrongWordsData.map((el: string) => (
                <span className="small" key={nanoid()}>
                  {el}
                </span>
              ))
            : [];

          return (
            <section key={inx} className="otherContainer">
              <div className="result">
                <div>{formatDate(parseInt(item.date))}</div>
                <h4 className="h4">
                  <span>
                    <span className="h2 result__number">{item.WPM}</span> WPM
                  </span>
                </h4>
                <div>
                  <span>Chars</span>
                  <span>
                    (<span className="correct small">{item.correctChars}</span> |{" "}
                    <span className="wrong small">{item.wrongChars}</span>){" "}
                    <span className="chars">{item.totalCharTyped}</span>
                  </span>
                </div>
                <div>
                  <span>Accuracy</span>{" "}
                  <span className="small">
                    <span className="accuracy">{item.accuracy}</span>%
                  </span>
                </div>
                <div>
                  <span>Correct</span>{" "}
                  <span className="correct small">{item.correctWords}</span>
                </div>
                <div>
                  <span>Wrong</span>{" "}
                  <span className="wrong small">{item.wrongWords}</span>
                </div>
              </div>
              <div className="wrongWords">
                <div className="h4 wrongWords__title">WRONG WORDS</div>
                <div className="wrongWords__div">
                  {output.length > 0 ? (
                    output
                  ) : (
                    <div style={{ textAlign: "center", width: "100%" }}>
                      No Wrong Words
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })
      )}
    </section>
  );
};

export default History;
