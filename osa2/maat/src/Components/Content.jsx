import { useEffect, useState } from "react";
import Country from "../Components/Country";

const Content = ({filter, setFilter, countries}) => {
    const [shown, setShown] = useState([]);
    
    useEffect(() => {
        let filtered = countries.filter(c => c.toLowerCase().includes(filter.toLowerCase()));
        setShown(filtered);
    }, [filter]);


    const show = (n) => {
        let exact = n.replace(".","").toLowerCase();            
        setShown(countries.filter(c => c.toLowerCase() === exact));
    };

    if(shown.length > 10 || filter == "") {
        return <p>Tarkenna hakua...</p>
    }
    else if(shown.length > 1 && shown.length < 10) {
        return (
            <table>
                <tbody>
                {shown.map(c => {
                    return <tr key={c}>
                        <td>
                            {c}
                        </td>
                        <td>
                            <button className={"detailButton"} onClick={()=>show(c)}> Show</button>
                        </td>
                    </tr>
                    }
                    )} 
                </tbody>
            </table>
        );
    }
    else if(shown.length == 1) {
        let country = shown[0];
        return <Country name={country}/>
    };
};

export default Content;