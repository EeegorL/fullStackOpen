const Person = ({name, num}) => {
    return (
        <tr>
            <td>{name}:</td>
            <td>{num}</td>
        </tr>
    );
};

export default Person;