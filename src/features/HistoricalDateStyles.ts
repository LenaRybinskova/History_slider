import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    max-width: 1442px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 50px;

    @media screen and (max-width: 320px) {
        padding: 0 30px;
    }
`;

export const Title = styled.h1`
    font-weight: 700;
    font-size: 56px;
    line-height: 120%;

    @media screen and (max-width: 320px) {
    }
`;

