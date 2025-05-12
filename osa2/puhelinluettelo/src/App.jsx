import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Components/Header";
import SubmitForm from "./Components/SubmitForm";
import ContactList from "./Components/ContactList";
import FilterForm from "./Components/FilterForm";
import Phonebook from "./Services/Phonebook";

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  useEffect(() => {
    Phonebook.getAll()
    .then(res => setPersons(res));
  }, []);

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

    const newPerson = {
      name: newName,
      number: newNum
    };

    axios.post("http://localhost:3001/persons", newPerson)
    .then(res => {
      setPersons(persons.concat(res.data));
      setNewName("");
      setNewNum("");
    });
  };
  const annihilatePerson = (id) => { // the person is shot by the Death Star's orbital laser, use with caution
    Phonebook.annihilate(id)
    .then(setPersons(persons.filter(p => p.id !== id)))
    .catch(err => console.log(err))
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
      <ContactList contacts={persons} filter={filter} del={annihilatePerson}/>
    </div>
  );
}

export default App