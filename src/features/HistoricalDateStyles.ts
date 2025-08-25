import styled from 'styled-components';
import {colors} from '../app/stylesVar';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin-inline: 320px 160px;
    border: 1px solid ${colors.text};
    padding-block: 176px 105px;
    padding-left:80px ;
    position: relative;
    background-color: rosybrown;
`;

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

