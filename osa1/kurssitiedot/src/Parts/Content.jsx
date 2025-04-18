import Part from "./Part";


const Content = (props) => {
    let content = props.parts;
    return (
        <>
        {content.map((part) => {
            return <Part part={part}/>
        })}
        </>
    )
}

export default Content;