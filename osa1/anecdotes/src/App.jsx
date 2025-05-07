import { useState } from "react";
import Anecdote from "./Components/Anecdote";
import NextBtn from "./Components/NextButton";
import LikeButton from "./Components/LikeButton";
import FanFavorite from "./Components/FanFavorite";

const App = () => {
const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  "The only way to go fast, is to go well."
];

const [likes, setLikes] = useState(new Array(anecdotes.length).fill(0));

const getRand = () => {
  return Math.floor(Math.random() * anecdotes.length);
};
const [selected, setSelected] = useState(() => getRand());


const likeSelected = () => {
  let copy = [...likes];
  copy[selected] += 1;

  setLikes(copy);
};

  return (
    <div>
      <h1>Päivän anekdootti</h1>
      <Anecdote anecdote={anecdotes[selected]} likes={likes[selected]}/>
      <LikeButton txt={"Tykkää"} click={() => likeSelected()}/>
      <NextBtn txt={"Seuraava"} setter={setSelected} rand={getRand}/>
      <FanFavorite anecdotes={anecdotes} likes={likes}/>
    </div>
  )
};

export default App;