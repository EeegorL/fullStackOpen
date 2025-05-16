const newId = (persons) => {
    const idArr = persons.map(person => parseInt(person.id));

    while(true) {
        let id = Math.floor(Math.random() * 10**5).toString();
        if(!idArr.includes(id)) {
            return id;
        }
    }
};

module.exports = { newId };