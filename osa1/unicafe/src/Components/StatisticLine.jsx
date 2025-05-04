const StatisticsLine = ({title, val}) => {
    return <tr>
            <td style={{alignContent:"left"}}>{title}:</td>
            <td> {val}</td>
        </tr>
};

export default StatisticsLine;