import StatisticsLine from "./StatisticLine";

const Stats = ({stats}) => {
    return (
        <table>
            <tbody>
            {stats.map(stat => {
                return <StatisticsLine key={stat.text} title={stat.text} val={stat.val}/>
            })}
            </tbody>
        </table>
    );
};
export default Stats;