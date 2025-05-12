const Person = ({id, name, num, del}) => {
    const confirm = () => {
        const c = window.confirm(`Poistetaaks tää ${name}-broidi?`);
        if(c) del(id);
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{num}</td>
            <td><button onClick={() => confirm()}>x</button></td>
        </tr>
    );
};

export default Person;