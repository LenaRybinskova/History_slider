import React from 'react';
import {HistoricalDates} from './features/HistoricalDates';
import GlobalStyle from './app/globalStyles';

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle/>
            <HistoricalDates/>
        </>
    )
};

export default App;