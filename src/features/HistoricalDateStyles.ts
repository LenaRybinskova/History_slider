import styled from 'styled-components';
import {colors} from '../app/stylesVar';




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

