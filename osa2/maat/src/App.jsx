import { useEffect, useState } from "react";

import Skibidi from "./Services/Skibidi";

import Header from "./Components/Header";
import Content from "./Components/Content";
import Form from "./Components/Form";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);


  useEffect(() => {
    Skibidi.getCommonNames()
    .then(data => {
      let arr = [];
      for(let x of data) arr.push(x.name.common);
      setCountries(arr);
    })}, []);

  return (
    <>
      <Header />
      <Form filter={filter} setter={setFilter}/>
      <Content filter={filter} setFilter={setFilter} countries={countries}/>
    </>
  );
};

export default App
