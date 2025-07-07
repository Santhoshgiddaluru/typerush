import WordsDivContainer from "./WordsDivContainer";
import OtherContainer from "./OtherContainer";
import Result from "./Result";
import History from "./History"
import { useAppSelector } from "../app/hooks";
import { optimizedSelectAppState } from "../features/appSlice";
import { optimizedSelectWordsState } from "../features/wordsSlice";
import { useEffect, useState } from "react";

const Body = () => {
  const { shouldShowOtherContainer } = useAppSelector(optimizedSelectAppState);
  const { displayPopUpResult } = useAppSelector(optimizedSelectWordsState);
  const [history, setHistory] = useState([])
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("history") || "[]")
    setHistory(data)
  }, [])
  return (
    <main className="container">
      {displayPopUpResult && <Result popUp={true} />}
      <WordsDivContainer />
      {shouldShowOtherContainer && <OtherContainer />}
      {history.length>0 && <History data={history}/>}
    </main>
  );
};

export default Body;
