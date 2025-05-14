import { useEffect, useState } from "react";
import Skibidi from "../Services/Skibidi";

const Country = ({name}) => {
    const [details, setDetails] = useState({});
    const [weather, setWeather] = useState({});

    useEffect(() => {
        Skibidi.getDetailed(name)
        .then(d => {
            const temp = {};

            temp.name = {
                eng: {
                    common: d.name.common,
                    official: d.name.official
                },
                native: {
                    common: d.name.nativeName ? d.name.nativeName[Object.keys(d.name.nativeName)[0]].common : "",
                    official: d.name.nativeName ? d.name.nativeName[Object.keys(d.name.nativeName)[0]].official : ""
                }
            };
            temp.capital = d.capital ? d.capital[0] : "No official capital";
            temp.area = d.area;
            temp.img = {flag: d.flags.png, coa: d.coatOfArms.png};
            temp.languages = d.languages ? Object.values(d.languages) : [];

            setDetails(temp);
        });

        
    }, []);

    if(details.name) { // if state has loaded, and has it's properties
        let headerEng = `${details.name.eng.common} ${details.name.eng.official !== details.name.eng.common ? "("+details.name.eng.official+")" : ""}`;
        let headerNative = (details.name.eng.common !== details.name.native.common && details.name.eng.official !== details.name.native.official) // if not same as the English variant, use native. otherwise blank
        ? (`${details.name.native.common} ${details.name.native.official !== details.name.native.common ? "("+details.name.native.official+")" : ""}`)
        : null;
        let capital = details.capital;
        let area = `${details.area} km²`; // to km
        let flag = details.img.flag;
        let coa = details.img.coa;
        
        return (
            <>
            <h2>{headerEng}</h2>
            <h3>{headerNative}</h3>
            <img src={flag} alt={`Flag of ${name}`} className="countryImage"/>
            <img src={coa} alt={`Couldn't load the coat of arms of ${name}`} className="countryImage" width={200} height={200}/>
            <p>Capital: {capital}</p>
            <p>Area: {area}</p>
            <p>Official languages: {details.languages.length > 0 ? details.languages.join(", ") : "None"}</p>
            </>
        );
    }
};

export default Country;