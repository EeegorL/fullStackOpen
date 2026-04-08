import { useState } from "react";

const Toggleable = (props) => {
    const [visible, setVisible] = useState(props.shown);

    return <div>
        <button 
            onClick={() => setVisible(!visible)}
            >{visible ? props.buttonTextHidden : props.buttonTextShown}
        </button>
        <div className={visible ? "" : "hidden"}>
            {props.children}
        </div>
    </div>
}

export default Toggleable;