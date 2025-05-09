const FilterForm = ({txt, val, change}) => {
    return (
        <>
            <h2>Hakusuodatus</h2>
            <div>{txt}: <input val={val} onChange={change}/></div>
        </>
    );
};

export default FilterForm;