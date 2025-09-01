import React, {memo, useCallback, useEffect, useState} from 'react';
import GlobalStyle from '../src/app/styles/globalStyles';
import styled from 'styled-components';
import {colors} from '../src/app/styles/stylesVar';
import {EventAPIType, fetchAllCategoriesTC, fetchEventByCategoryIdTC} from './app/store/categoriesReducer';
import {useAppDispatch, useAppSelector} from '../src/app/store/store';
import {TimelineSlider} from '../src/features/TimelineSlider/TimelineSlider';
import {TimePeriod} from '../src/features/TimePeriod/TimePeriod';
import {AnimatedCircle} from '../src/features/Circle/Circle';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    margin-inline: 320px 160px;
    border-inline: 1px solid ${colors.textWithPoacity};
    padding-block: 176px 105px;
    padding-inline: 80px;
    background-color: ${colors.background};
    position: relative;

    &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: 1px;
        height: 100%;
        background-color: ${colors.text};
        opacity: 0.1;
        z-index: 1;
    }

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 45%;
        transform: translateY(-50%);
        width: 100%;
        height: 1px;
        background-color: ${colors.text};
        opacity: 0.1;
        z-index: 1;
    }
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
        background: linear-gradient(to bottom, ${colors.primary}, ${colors.secondary});
    }
`;


const MemoizedTimePeriod = memo(TimePeriod);
const MemoizedAnimatedCircle = memo(AnimatedCircle);
const MemoizedTimelineSlider = memo(TimelineSlider);

const App = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(2);
    const [activeCategoryId, setActiveCategoryId] = useState<string>('3333333');
    const [actualPeriod, setActualPeriod] = useState<number[]>([]);
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.categories);
    const events = useAppSelector(state =>
        state.categories.eventsByIdCategories[activeCategoryId] || []
    );

    const handlePointClick = useCallback((index: number, categoryId: string) => {
        setActiveCategoryIndex(index);
        setActiveCategoryId(categoryId);
    }, []);

    const prepareTimePeriod = useCallback((events: EventAPIType[]) => {
        if (!events || events.length === 0) {
            setActualPeriod([]);
            return;
        }

        const years = events.map(event => Number(event.year));
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        setActualPeriod([minYear, maxYear]);
    }, []);

    useEffect(() => {
        dispatch(fetchAllCategoriesTC());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchEventByCategoryIdTC(activeCategoryId));
    }, [activeCategoryId, dispatch]);

    useEffect(() => {
        if (events && events.length > 0) {
            prepareTimePeriod(events);
        }
    }, [events, prepareTimePeriod]);

    useEffect(() => {
        if (categories.length > 0 && !activeCategoryId) {
            const threeOClockIndex = Math.min(1, categories.length - 1);
            setActiveCategoryIndex(threeOClockIndex);
            setActiveCategoryId(categories[threeOClockIndex].id);
        }
    }, [categories, activeCategoryId]);

    return (
        <Container>
            <GlobalStyle/>
            <Title>Исторические даты</Title>
            <MemoizedTimePeriod period={actualPeriod}/>
            <MemoizedAnimatedCircle
                categories={categories}
                onPointClick={handlePointClick}
                activePointIndex={activeCategoryIndex}
            />
            <MemoizedTimelineSlider
                activeCategoryIndex={activeCategoryIndex}
                onPointClick={handlePointClick}
                categories={categories}
                activeCategoryId={activeCategoryId}
                events={events}
            />
        </Container>
    );
};

export default App;