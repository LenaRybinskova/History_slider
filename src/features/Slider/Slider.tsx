import {useRef, useState} from 'react'
import type SwiperType from 'swiper'
import styled from 'styled-components'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import ArrowBackSVG from '../../../public/icons/ArrowBack'
import ArrowForwardSVG from '../../../public/icons/ArrowForward'
import {ButtonSlider} from '../../common/components/ButtonSlider/ButtonSlider';
import {PartData} from '../../common/components/PartData/PartData';
import {Card} from '../../common/components/Card/Card';


interface TimelineEvent {
    year: string
    title: string
    description: string
}

const timelineData: TimelineEvent[] = [
    {
        year: '2015',
        title: '13 сентября — частное солнечное затмение',
        description: 'видимое в Южной Африке и части Антарктиды',
    },
    {
        year: '2016',
        title: 'Телескоп «Хаббл» обнаружил самую удалённую галактику',
        description: 'из всех обнаруженных галактик, получившую обозначение GN-z11',
    },
    {
        year: '2017',
        title: 'Компания Tesla официально представила',
        description: 'первый в мире электрический грузовик Tesla Semi',
    },
    {
        year: '2018',
        title: 'Запуск космического телескопа',
        description: 'TESS для поиска экзопланет',
    },
    {
        year: '2019',
        title: 'Первое изображение чёрной дыры',
        description: 'в галактике M87 получено телескопом Event Horizon',
    },
]

const ContainerSlider = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef<SwiperType | null>(null)

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex)
    }

    const goToPrevSlide = () => {
        swiperRef.current?.slidePrev()
    }

    const goToNextSlide = () => {
        swiperRef.current?.slideNext()
    }

    const data = [1, 2, 3]

    return (
        <ContainerSlider>
            <Counter>
                <Parts>
                    <PartData data={String(activeIndex + 1).padStart(2, '0')}/>
                    /<PartData data={String(timelineData.length).padStart(2, '0')}/>
                </Parts>
                <ButtonsContainer>
                    <ButtonSlider><ArrowBackSVG/></ButtonSlider>
                    <ButtonSlider><ArrowForwardSVG/></ButtonSlider>
                </ButtonsContainer>
            </Counter>


            <TimelineContainer>
                {data.map(d => (
                    <Card title={'1997'} description={'kfndnvndfnlknlsklfvnf   skmdkfmpsdmp lsdmpfppdsk'}/>
                ))}
            </TimelineContainer>
            {/*
             Timeline dots
            <TimelineDotsContainer>
                <TimelineLine/>
                <DotsWrapper>
                    {timelineData.map((_, index) => (
                        <DotButton
                            key={index}
                            $isActive={index === activeIndex}
                            onClick={() => swiperRef.current?.slideTo(index)}
                        />
                    ))}
                </DotsWrapper>
            </TimelineDotsContainer>

             Main slider
            <StyledSwiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={3}
                centeredSlides={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
                onSlideChange={handleSlideChange}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                className="timeline-swiper"
            >
                {timelineData.map((event, index) => (
                    <SwiperSlide key={index}>
                        <SlideCard $isActive={index === activeIndex}>
                            <Year>{event.year}</Year>
                            <Title>{event.title}</Title>
                            <Description>{event.description}</Description>
                        </SlideCard>
                    </SwiperSlide>
                ))}
            </StyledSwiper>

             Navigation arrow for next slide
            <BottomNavigation>
                <NextButton onClick={goToNextSlide} disabled={activeIndex === timelineData.length - 1}>
                    <ChevronRightIcon/>
                </NextButton>
            </BottomNavigation>*/}
        </ContainerSlider>
    )
}
