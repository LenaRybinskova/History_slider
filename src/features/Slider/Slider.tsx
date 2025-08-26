import { useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import type SwiperType from "swiper"
import styled from "styled-components"
import { colors } from "../../app/stylesVar"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface TimelineEvent {
    year: string
    title: string
    description: string
}

const timelineData: TimelineEvent[] = [
    {
        year: "2015",
        title: "13 сентября — частное солнечное затмение",
        description: "видимое в Южной Африке и части Антарктиды",
    },
    {
        year: "2016",
        title: "Телескоп «Хаббл» обнаружил самую удалённую галактику",
        description: "из всех обнаруженных галактик, получившую обозначение GN-z11",
    },
    {
        year: "2017",
        title: "Компания Tesla официально представила",
        description: "первый в мире электрический грузовик Tesla Semi",
    },
    {
        year: "2018",
        title: "Запуск космического телескопа",
        description: "TESS для поиска экзопланет",
    },
    {
        year: "2019",
        title: "Первое изображение чёрной дыры",
        description: "в галактике M87 получено телескопом Event Horizon",
    },
]

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`

const Counter = styled.div`
  font-size: 14px;
  color: ${colors.mutedForeground};
  font-weight: 500;
`

const NavigationButtons = styled.div`
  display: flex;
  gap: 8px;
`

const NavButton = styled.button<{ disabled?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid ${colors.border};
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background-color: ${colors.accent};
  }

  &:disabled {
    cursor: not-allowed;
  }
`

const TimelineDotsContainer = styled.div`
  position: relative;
  margin-bottom: 48px;
`

const TimelineLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: ${colors.border};
  transform: translateY(-50%);
`

const DotsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`

const DotButton = styled.button<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isActive ? colors.primary : colors.muted)};
  border: 2px solid ${colors.background};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`

const SlideCard = styled.div<{ $isActive: boolean }>`
  padding: 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: ${(props) => (props.$isActive ? colors.card : colors.muted + "80")};
  border: ${(props) => (props.$isActive ? `1px solid ${colors.border}` : "none")};
  box-shadow: ${(props) => (props.$isActive ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none")};
`

const Year = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.primary};
  margin-bottom: 16px;
`

const Title = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.foreground};
  margin-bottom: 12px;
`

const Description = styled.p`
  color: ${colors.mutedForeground};
  line-height: 1.6;
`

const BottomNavigation = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`

const NextButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.primary};
  background: transparent;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    color: ${colors.primary}CC;
  }
`

const StyledSwiper = styled(Swiper)`
  &.timeline-swiper {
    .swiper-slide {
      transition: opacity 0.3s ease;
    }
    
    .swiper-slide:not(.swiper-slide-active) {
      opacity: 0.7;
    }
    
    .swiper-slide-active {
      opacity: 1;
    }
  }
`

// Custom SVG icon components
const ChevronLeftIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="15,18 9,12 15,6"></polyline>
    </svg>
)

const ChevronRightIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="9,18 15,12 9,6"></polyline>
    </svg>
)

export function TimelineSlider() {
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef<SwiperType>()

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex)
    }

    const goToPrevSlide = () => {
        swiperRef.current?.slidePrev()
    }

    const goToNextSlide = () => {
        swiperRef.current?.slideNext()
    }

    return (
        <Container>
            {/* Header with counter and navigation */}
            <Header>
                <Counter>
                    {String(activeIndex + 1).padStart(2, "0")}/{String(timelineData.length).padStart(2, "0")}
                </Counter>

                <NavigationButtons>
                    <NavButton onClick={goToPrevSlide} disabled={activeIndex === 0}>
                        <ChevronLeftIcon />
                    </NavButton>
                    <NavButton onClick={goToNextSlide} disabled={activeIndex === timelineData.length - 1}>
                        <ChevronRightIcon />
                    </NavButton>
                </NavigationButtons>
            </Header>

            {/* Timeline dots */}
            <TimelineDotsContainer>
                <TimelineLine />
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

            {/* Main slider */}
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

            {/* Navigation arrow for next slide */}
            <BottomNavigation>
                <NextButton onClick={goToNextSlide} disabled={activeIndex === timelineData.length - 1}>
                    <ChevronRightIcon />
                </NextButton>
            </BottomNavigation>
        </Container>
    )
}
