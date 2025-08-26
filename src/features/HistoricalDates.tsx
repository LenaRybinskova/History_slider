import {TimePeriod} from './TimePeriod/TimePeriod';
import {AnimatedCircle} from './Circle/Circle';
import styled from 'styled-components';

export const Title = styled.h1`
    font-weight: 700;
    font-size: 56px;
    line-height: 120%;
    width: 353px;
    white-space: normal;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        left: -80px;
        top: 70px;
        transform: translateY(-50%);
        width: 5px;
        height: 120px;
        background: linear-gradient(to bottom, #5d5fef, #ef5da8);
    }
`;

export const HistoricalDates = () => {
    return (
        <>
            <Title>Исторические даты</Title>
            <TimePeriod/>
            <AnimatedCircle pointsCount={6} onPointClick={()=>{}}/>

        </>

    )
}