import React from 'react';
import {HistoricalDates} from './features/HistoricalDates';
import GlobalStyle from './app/globalStyles';
import {Container} from './features/HistoricalDateStyles';


const App= () => {
    return (
        <Container>
            <GlobalStyle/>
            <HistoricalDates/>
        </Container>
    )
};

export default App;