import Person from "./Person";

const ContactList = ({contacts, filter}) => {
    let cond = (c) => c.name.toLowerCase().includes(filter.toLowerCase()) | c.number.toLowerCase().includes(filter.toLowerCase()) | filter == "";
    
    return (
        <>
        <h2>Yhteystiedot</h2>
        <table>
            <tbody>
                {contacts.map(contact => {
                    if(cond(contact)) {
                        return <Person key={contact.name} name={contact.name} num={contact.number}/>
                    };
                })}
            </tbody>
        </table>
        </>
    );
};

export default ContactList;