import { useEffect, useState } from "react";

import Header from "./Components/Header";
import SubmitForm from "./Components/SubmitForm";
import ContactList from "./Components/ContactList";
import FilterForm from "./Components/FilterForm";
import Notification from "./Components/Notification";

import Phonebook from "./Services/Phonebook";

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  const [notifMsg, setNotifMsg] = useState("");
  const [notifType, setNotifType] = useState("none");

  const [filter, setFilter] = useState("");

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

  const showNotification = (msg, type) => {
    setNotifMsg(msg);
    setNotifType(type);
    setTimeout(() => {
      setNotifMsg("");
      setNotifType("none");
    }, 3000);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNum
    };
    let existingPerson = persons.filter(p => p.name === newName);

    if(existingPerson.length > 0) {
      let c = window.confirm(`${newName} löytyy jo! Vaihdetaanko henkilön numero uuteen: ${newNum} ?`);
      if(c) {
        Phonebook.update(existingPerson[0].id, newPerson)
        .then(() => showNotification("Päivitetty!", "info"))
        .catch(err => showNotification(err.message, "error"))
        .then(() => Phonebook.getAll().then(a => setPersons(a)));
      }
      return;
    }
    else {
      Phonebook.create(newPerson)
      .then(() => showNotification(`${newName} lisätty!`, "info"))
      .catch(err => showNotification(err.message, "error"))
      .then(() => Phonebook.getAll().then(a => setPersons(a)));
    }
  };

  const annihilatePerson = (id) => { // the person is shot by the Death Star's orbital laser, use with caution
    Phonebook.annihilate(id)
    .then(() => showNotification("Henkilö tuhottu! 😝", "info"))
    .catch(err => showNotification(err.message, "error"))
    .then(() => Phonebook.getAll().then(a => setPersons(a)));

  };

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
      <Notification msg={notifMsg} type={notifType}/>
      <FilterForm txt={"Suodata hakua"} val={filter} change={handleFilterSet}/>
      <Header title={"Puhelinluettelo"}/>
      <SubmitForm fields={formFields} submit={addPerson} submitText={"Lisää"}/>
      <ContactList contacts={persons} filter={filter} del={annihilatePerson}/>
    </div>
  );
}

export default App