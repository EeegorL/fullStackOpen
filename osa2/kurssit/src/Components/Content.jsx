import Part from "./Part";

const Content = ({ parts }) => {
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <>        
        <table>
            <tbody>
                <tr>
                    <th><h3>Part's name</h3></th>
                    <th><h3>Exercises in part</h3></th>
                </tr>
                {parts.map(part => {
                    return <Part key={part.name+part.id} name={part.name} exs={part.exercises} />
                })}
            </tbody>
        </table>
        <p>Exercises in total: {sum}</p>
        </>
    );
};

export default Content;