import { useState } from "react";
import Header from "./Components/Header";
import SubmitForm from "./Components/SubmitForm";
import ContactList from "./Components/ContactList";
import FilterForm from "./Components/FilterForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "+358536297676"}
  ]); 
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  const handleNameSet = (e) => {
    let val = e.target.value;
    setNewName(val);
  };
  const handleNumSet = (e) => {
    let val = e.target.value;
    setNewNum(val);
  };
  const handleFilterSet = (e) => {
    let val = e.target.value;
    setFilter(val);
  };

  const addPerson = (e) => {
    e.preventDefault();
    if(persons.some(person => person.name == newName)) {
      alert(`${newName} löytyy jo!`);
      return;
    };
    let copy = [...persons];
    copy.push({name: newName, number: newNum});
    setPersons(copy);
  };

  const [filter, setFilter] = useState("");

  let formFields = [
    {
      name: "Nimi",
      val: newName,
      change: handleNameSet
    },
    {
      name: "Puhelinnumero",
      val: newNum,
      change: handleNumSet
    }
  ];

  return (
    <div>
      <FilterForm txt={"Suodata hakua"} val={filter} change={handleFilterSet}/>
      <Header title={"Puhelinluettelo"}/>
      <SubmitForm fields={formFields} submit={addPerson} submitText={"Lisää"}/>
      <ContactList contacts={persons} filter={filter}/>
    </div>
  )

}

export default App