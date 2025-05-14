const Form = ({filter, setter}) => {
    const handleFilterChange = (e) => {
        let val = e.target.value;
        setter(val);
    };

    return (
        <>
            <span>Rajaa hakua: <input autoFocus onChange={(e)=>handleFilterChange(e)} value={filter}/></span>
        </>
    );
};

export default Form;