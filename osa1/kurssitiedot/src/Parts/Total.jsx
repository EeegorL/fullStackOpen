const Total = (props) => {
    let exercisesAmount = 0;
    for(let part of props.parts) {
        exercisesAmount += part.exercises;
    }

    return (
        <p>Number of exercises {exercisesAmount}</p>
    )
};

export default Total;