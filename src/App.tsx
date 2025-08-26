import React, {useEffect} from 'react';
import {HistoricalDates} from './features/HistoricalDates';
import GlobalStyle from '../src/app/styles/globalStyles';
import styled from 'styled-components';
import {colors} from '../src/app/styles/stylesVar';
import {fetchCategoriesTC} from './app/store/categoriesReducer';
import {useAppDispatch, useAppSelector} from '../src/app/store/store';
import {TimelineSlider} from '../src/features/TimelineSlider/TimelineSlider';



export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    margin-inline: 320px 160px;
    border: 1px solid ${colors.text};
    padding-block: 176px 105px;
    padding-left: 80px;
    background-color: rosybrown;

    position: relative;
`;

const App= () => {
    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(fetchCategoriesTC())
    }, []);

    console.log("categories", categories)
    return (
        <Container>
            <GlobalStyle/>
            <HistoricalDates/>
            <TimelineSlider/>
        </Container>
    )
};

export default App;