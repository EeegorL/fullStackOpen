const NextBtn = ({txt, setter, rand}) => {
    return <button onClick={()=>setter(rand())}>{txt}</button>
};

export default NextBtn;