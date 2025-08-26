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


export const TimePeriod = () => {
    return (
        <TimePeriodContainer>
            <Date>
                2015
            </Date>
            <Date $secondary>
                2022
            </Date>
        </TimePeriodContainer>
    )
}