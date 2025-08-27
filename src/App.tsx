import React, {useEffect, useState} from 'react';
import GlobalStyle from '../src/app/styles/globalStyles';
import styled from 'styled-components';
import {colors} from '../src/app/styles/stylesVar';
import {fetchAllCategoriesTC, fetchEventByCategoryIdTC} from './app/store/categoriesReducer';
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
    border: 1px solid ${colors.text};
    padding-block: 176px 105px;
    padding-left: 80px;
    background-color: rosybrown;

    position: relative;
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


const App = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(1);
    const [activeCategoryId, setActiveCategoryId] = useState<string>('');
    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.categories.categories);
    console.log('Категории в родит получили: ', categories)

    const handlePointClick = (index: number, categoryId: string) => {
        console.log('Кликнули на точку:', index + 1, 'ID категории:', categoryId);
        setActiveCategoryIndex(index)
        setActiveCategoryId(categoryId)
    };

    useEffect(() => {
        dispatch(fetchAllCategoriesTC())
    }, []);

    useEffect(() => {
        dispatch(fetchEventByCategoryIdTC(activeCategoryId))
    }, [activeCategoryId]);

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
            <TimePeriod/>
            <AnimatedCircle
                categories={categories}
                onPointClick={handlePointClick}
                activePointIndex={activeCategoryIndex}
            />
            <TimelineSlider
                activeCategoryIndex={activeCategoryIndex}
                onPointClick={handlePointClick}
                categories={categories}
                activeCategoryId={activeCategoryId}
            />
        </Container>
    )
};

export default App;