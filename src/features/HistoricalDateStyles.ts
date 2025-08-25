import styled from 'styled-components';
import {colors} from '../app/stylesVar';


export const Container = styled.div`
    width: 100%;
    max-width: 1442px;
    height: 100%;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid ${colors.text};
    /*
    padding: 0 50px;
    */

    @media screen and (max-width: 320px) {
        padding: 0 30px;
    }
`;

export const Title = styled.h1`
    display: block;
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

