import React from 'react';
import {HistoricalDates} from './features/HistoricalDates';
import GlobalStyle from './app/globalStyles';
import styled from 'styled-components';
import {colors} from './app/stylesVar';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    margin-inline: 320px 160px;
    border: 1px solid ${colors.text};
    padding-block: 176px 105px;
    padding-left:80px ;
    background-color: rosybrown;

    position: relative;
`;

const App= () => {
    return (
        <Container>
            <GlobalStyle/>
            <HistoricalDates/>
        </Container>
    )
};

export default App;