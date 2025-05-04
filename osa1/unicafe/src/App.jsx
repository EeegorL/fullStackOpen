import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Statistics from "./Components/Statistics";
import Buttons from "./Components/Buttons";
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (type) => {
    switch(type) {
      case 1:
        setGood(good + 1);
        break;
      case 2:
        setNeutral(neutral + 1);
        break;
      case 3:
        setBad(bad + 1);
        break;
    };
  };

  const buttons = [
    {text: "good", action: () => handleClick(1)},
    {text: "neutral", action: () => handleClick(2)},
    {text: "bad", action: () => handleClick(3)}
  ];

  const stats = [
    {text: "good", val: good},
    {text: "neutral", val: neutral},
    {text: "bad", val: bad},
    {text: "all", val: good + neutral + bad},
    {text: "average", val: ((good - bad) / (good + neutral + bad) || 0).toFixed(2)},
    {text: "positive", val: (good / (good + neutral + bad) || 0).toFixed(2) + "%"}
  ];

  return (
    <div>
      <Header/>
      <Buttons buttons={buttons}/>
      <Statistics stats={stats}/>
    </div>
  )
}

export default App
