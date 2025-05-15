import { useEffect, useState } from "react";
import Skibidi from "../Services/Skibidi";

const Country = ({name}) => {
    const [details, setDetails] = useState({});
    const [weather, setWeather] = useState({});

    useEffect(() => {

        Skibidi.getDetailed(name)
        .then(d => {
            let temp = {};
            
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
            temp.latlong = {lat: d.latlng[0], long: d.latlng[1]};

            setDetails(temp);

            temp = {};
            Skibidi.getWeather(d.latlng[0], d.latlng[1])
            .then(a => {
                temp.clouds = a.clouds;
                temp.temp = a.main.temp - 273.15; // K to C
                temp.weather = {type: a.weather[0].main, desc: a.weather[0].description, icon: ` https://openweathermap.org/img/wn/${a.weather[0].icon}@2x.png`};
                temp.wind = a.wind.speed;

                setWeather(temp);
            });
        });
    }, []);

    if(details.name && weather.temp) { // if states have loaded, and have their properties
        let headerEng = `${details.name.eng.common} ${details.name.eng.official !== details.name.eng.common ? "("+details.name.eng.official+")" : ""}`;
        let headerNative = (details.name.eng.common !== details.name.native.common && details.name.eng.official !== details.name.native.official) // if not same as the English variant, use native. otherwise blank
        ? (`${details.name.native.common} ${details.name.native.official !== details.name.native.common ? "("+details.name.native.official+")" : ""}`)
        : null;
        let capital = details.capital;
        let area = `${details.area} km²`;
        let flag = details.img.flag;
        let coa = details.img.coa;

        let temperature = parseFloat(weather.temp).toFixed(1);
        let wind = weather.wind;
        let weatherType = weather.weather.type;
        let weatherIcon = weather.weather.icon;
        let weatherDesc = weather.weather.desc;

        return (
            <>
            <hr/>
            <h2>{headerEng}</h2>
            <h3>{headerNative}</h3>
            <img src={flag} alt={`Flag of ${name}`} className="countryImage"/>
            <img src={coa} alt={`Couldn't load the coat of arms of ${name}`} className="countryImage" width={200} height={200}/>
            <p>Capital: {capital}</p>
            <p>Area: {area}</p>
            <p>Official languages: {details.languages.length > 0 ? details.languages.join(", ") : "None"}</p>
            <br/>
            
            <table>
                <tbody>
                    <tr>
                        <td>
                            <h3>Weather in {capital != "No official capital" ? capital : name}</h3>
                            <p>Temperature: {temperature}°C</p>
                            <p>Wind speed: {wind} m/s</p>
                            <p>{weatherType} ({weatherDesc})</p>
                        </td>
                        <td>
                            <img src={weatherIcon}/>
                        </td>
                    </tr>
                </tbody>
            </table>

            </>
        );
    }
};

export default Country;