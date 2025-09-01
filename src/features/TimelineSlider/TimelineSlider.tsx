import React from 'react';
import styled from 'styled-components'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ArrowBackSVG from '../../../public/icons/ArrowBack'
import ArrowForwardSVG from '../../../public/icons/ArrowForward'
import {ButtonSlider} from 'common/components/ButtonSlider/ButtonSlider'
import {PartData} from 'common/components/PartData/PartData'
import {Card} from 'common/components/Card/Card'
import {CategoryType} from 'mockData/mockData';
import {useEffect, useRef, useState} from 'react';
import {EventAPIType} from 'app/store/categoriesReducer';
import {Swiper, SwiperSlide} from 'swiper/react'
import {FreeMode, Navigation} from 'swiper/modules'
import { Swiper as SwiperClass } from 'swiper';

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
    height: 88px;
`

const Parts = styled.div`
`

const ButtonsContainer = styled.div`
    display: flex;
    gap: 20px;
`

const SliderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 100px;
    height: 100%;
    width: 100%;
    position: relative;
`

const SliderContainer = styled.div`
    width: 100%;
`

const StyledSwiper = styled(Swiper)`
    width: 100%;
`

const NavigationButton = styled(ButtonSlider)<{ position: 'left' | 'right' }>`
    position: absolute;
    top: 50%;
    transform: translateY(-30%);
    z-index: 10;
    border:none;
    width: 40px;
    height: 40px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    ${(props) => (props.position === 'left' ? 'left: -55px' : 'right: -55px')}
    
`

const StyledSwiperSlide = styled(SwiperSlide)`
    height: auto;
`

type Props = {
    activeCategoryIndex: number
    onPointClick?: (index: number, categoryId: string) => void;
    categories: CategoryType[]
    activeCategoryId: string
    events: EventAPIType[]
}

export function TimelineSlider(props: Props) {
    console.log('РЕРЕНДЕР TimelineSlider')
    const {activeCategoryIndex, activeCategoryId, onPointClick, categories, events} = props;
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)
    const navigationPrevRef = useRef<HTMLButtonElement>(null)
    const navigationNextRef = useRef<HTMLButtonElement>(null)
    const swiperRef = useRef<SwiperClass | null>(null);
    const showSliderButtons = categories.length > 1;


    const onClickButtonSlider = (direction: number) => {
        const newIndex = activeCategoryIndex + direction

        if (newIndex >= 0 && newIndex < categories.length) {
            if (onPointClick) {
                onPointClick(newIndex, categories[newIndex].id)
            }
        }
    }

    useEffect(() => {
        setIsBeginning(true)
        setIsEnd(events.length <= 3)
    }, [activeCategoryId, events.length])

    return (
        <ContainerSlider>
            <Counter>
                <Parts>
                    <PartData data={(activeCategoryIndex + 1).toString()}/>
                    /<PartData data={categories.length.toString()}/>
                </Parts>
                {showSliderButtons && (
                    <ButtonsContainer>
                        <ButtonSlider
                            onClick={() => onClickButtonSlider(-1)}><ArrowBackSVG/>
                        </ButtonSlider>
                        <ButtonSlider onClick={() => onClickButtonSlider(1)}>
                            <ArrowForwardSVG/>
                        </ButtonSlider>
                    </ButtonsContainer>
                )}
            </Counter>

            <SliderWrapper>
                <SliderContainer>
                    <StyledSwiper
                        modules={[Navigation, FreeMode]}
                        spaceBetween={25}
                        slidesPerView={3}
                        slidesPerGroup={1}
                        speed={550}
                        freeMode={true}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 25,
                            },
                        }}
                        onSwiper={(swiper: SwiperClass) => {
                            swiperRef.current = swiper;
                            // @ts-ignore
                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                            // @ts-ignore
                            swiper.params.navigation.nextEl = navigationNextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                        onSlideChange={(swiper: SwiperClass) => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                    >
                        {events.map((event) => (
                            <StyledSwiperSlide key={event.id}>
                                <Card title={event.year} description={event.description}/>
                            </StyledSwiperSlide>
                        ))}
                    </StyledSwiper>
                </SliderContainer>

                {!isBeginning && (
                    <NavigationButton
                        withBackground
                        ref={navigationPrevRef}
                        onClick={() => swiperRef.current?.slidePrev?.()}
                        position="left"
                    >
                        <ArrowBackSVG/>
                    </NavigationButton>
                )}

                {!isEnd && (
                    <NavigationButton
                        withBackground
                        ref={navigationNextRef}
                        onClick={() => swiperRef.current?.slideNext?.()}
                        position="right"
                    >
                        <ArrowForwardSVG/>
                    </NavigationButton>
                )}
            </SliderWrapper>
        </ContainerSlider>
    )
}




