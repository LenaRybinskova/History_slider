import styled from 'styled-components';
import {colors} from '../../app/styles/stylesVar';

export const TimePeriodContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 125px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
`;

export const Date = styled.div<{ $secondary?: boolean }>`
    font-weight: 700;
    font-size: 200px;
    line-height: 80%;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${props => props.$secondary ? colors.secondary : colors.primary};
`;
type Props={
    period:Number[]
}

export const TimePeriod = ({period}:Props) => {
    console.log("TimePeriod",period )
    return (
        <TimePeriodContainer>
            <Date>
                {period[0]?.toString()}
            </Date>
            <Date $secondary>
                {period[1]?.toString()}
            </Date>
        </TimePeriodContainer>
    )
}