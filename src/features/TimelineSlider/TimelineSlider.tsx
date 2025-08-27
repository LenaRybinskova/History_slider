/*
import styled from 'styled-components'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ArrowBackSVG from '../../../public/icons/ArrowBack'
import ArrowForwardSVG from '../../../public/icons/ArrowForward'
import {ButtonSlider} from '../../common/components/ButtonSlider/ButtonSlider';
import {PartData} from '../../common/components/PartData/PartData';
import {Card} from '../../common/components/Card/Card';



const ContainerSlider = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 60px;
`

const Counter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`

const Parts = styled.div`
`

const ButtonsContainer = styled.div`
    display: flex;
    gap: 20px`

const TimelineContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 100px`


export function TimelineSlider() {

    const data = [1, 2, 3]

    return (
        <ContainerSlider>
            <Counter>
                <Parts>
                    <PartData data={"01"}/>
                    /<PartData data={"06"}/>
                </Parts>
                <ButtonsContainer>
                    <ButtonSlider><ArrowBackSVG/></ButtonSlider>
                    <ButtonSlider><ArrowForwardSVG/></ButtonSlider>
                </ButtonsContainer>
            </Counter>


            <TimelineContainer>
                <ButtonSlider><ArrowBackSVG/></ButtonSlider> {/!*надо чтобы эта кнопка исчезала, если в data нечего переключать слайдером*!/}
                {data.map(d => (
                    <Card title={'1997'} description={'kfndnvndfnlknlsklfvnf   skmdkfmpsdmp lsdmpfppdsk'}/>
                ))}
                <ButtonSlider><ArrowForwardSVG/></ButtonSlider>
            </TimelineContainer>

        </ContainerSlider>
    )
}
*/


import styled from 'styled-components'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ArrowBackSVG from '../../../public/icons/ArrowBack'
import ArrowForwardSVG from '../../../public/icons/ArrowForward'
import {ButtonSlider} from '../../common/components/ButtonSlider/ButtonSlider'
import {PartData} from '../../common/components/PartData/PartData'
import {Card} from '../../common/components/Card/Card'
import {CategoryType} from '../../mockData/mockData';
import {useState} from 'react';

const ContainerSlider = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 60px;
`

const Counter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`

const Parts = styled.div`
`

const ButtonsContainer = styled.div`
    display: flex;
    gap: 20px;
`

const TimelineContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 100px;
`
type Props = {
    activeCategoryIndex: number
    onPointClick?: (index: number, categoryId: string) => void;
    categories: CategoryType[]
    activeCategoryId: string
}

export function TimelineSlider(props: Props) {
    const { activeCategoryIndex, activeCategoryId, onPointClick, categories } = props;

    const onClickButtonSlider = (direction: number) => {
        // Вычисляем новый индекс с учетом границ
        const newIndex = activeCategoryIndex + direction;

        // Проверяем границы (0 до categories.length - 1)
        if (newIndex >= 0 && newIndex < categories.length) {
            // Вызываем callback из родителя с новым индексом и соответствующим ID
            onPointClick(newIndex, categories[newIndex].id);
        }
    }

    const data = [1, 2, 3];
    const showSliderButtons = categories.length > 1;

    return (
        <ContainerSlider>
            <Counter>
                <Parts>
                    <PartData data={(activeCategoryIndex + 1).toString()}/>
                    /<PartData data={categories.length.toString()}/>
                </Parts>
                {showSliderButtons && (
                    <ButtonsContainer>
                        {/* Кнопка "назад" - уменьшаем индекс на 1 */}
                        <ButtonSlider
                            onClick={() => onClickButtonSlider(-1)}
                            disabled={activeCategoryIndex === 0}
                        >
                            <ArrowBackSVG/>
                        </ButtonSlider>

                        {/* Кнопка "вперед" - увеличиваем индекс на 1 */}
                        <ButtonSlider
                            onClick={() => onClickButtonSlider(1)}
                            disabled={activeCategoryIndex === categories.length - 1}
                        >
                            <ArrowForwardSVG/>
                        </ButtonSlider>
                    </ButtonsContainer>
                )}
            </Counter>

            <TimelineContainer>
                {data.map((d, index) => (
                    <Card
                        key={index}
                        title={'1997'}
                        description={'kfndnvndfnlknlsklfvnf skmdkfmpsdmp lsdmpfppdsk'}
                    />
                ))}
            </TimelineContainer>
        </ContainerSlider>
    )
}

