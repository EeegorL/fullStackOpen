const Part = (props) => {
    let part = props.part;
    return <p key={part.name}>{part.name} {part.exercises}</p>
}

export default Part;