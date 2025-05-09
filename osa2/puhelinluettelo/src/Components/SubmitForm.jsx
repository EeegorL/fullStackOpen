const SubmitForm = ({fields, submit, submitText}) => {
    return (
        <form onSubmit={submit}>
            {fields.map(field => <div key={field.name}>{field.name}: <input value={field.val} onChange={field.change}/></div>)}
            <div>
                <button type="submit">{submitText}</button>
            </div>
      </form>
    );
};

export default SubmitForm;