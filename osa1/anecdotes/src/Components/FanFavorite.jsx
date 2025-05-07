import Anecdote from "./Anecdote";

const FanFavorite = ({anecdotes, likes}) => {
    const getMax = () => {
      let max = 0;
      for(let i = 0; i < likes.length; i++) {
          if(likes[i] > likes[max]) {
            max = i;
          }
      }
      return max;
    };
    let max = getMax();
    let anecdoteText = anecdotes[max];
    let anecdotesLikes = likes[max]
    
    return <>
    <h1>Yleisön lemppari</h1>
    <Anecdote anecdote={anecdoteText} likes={anecdotesLikes}/>
    </>
};

export default FanFavorite;