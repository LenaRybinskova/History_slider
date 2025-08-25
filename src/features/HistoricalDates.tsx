import { Title} from './HistoricalDateStyles';
import {TimePeriod} from './TimePeriod/TimePeriod';
import {AnimatedCircle} from './Circle/Circle';


export const HistoricalDates = () => {
    return (
        <>
            <Title>Исторические даты</Title>
            <TimePeriod/>
            <AnimatedCircle pointsCount={6} onPointClick={()=>{}}/>
        </>

    )
}