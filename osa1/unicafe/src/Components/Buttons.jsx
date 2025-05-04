import Button from "./Button";

const Buttons = ({buttons}) => {
    return (
        <>
        {buttons.map(button => {
            return <Button key={"button-"+button.text} action={button.action} text={button.text}></Button>
            }
            )
        }
        </>
    )
};

export default Buttons;