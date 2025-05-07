const Anecdote = ({anecdote, likes}) => {

    return <>
        <p>{anecdote}</p>
        <p>{likes} tykkäystä</p>
    </>
};

export default Anecdote;