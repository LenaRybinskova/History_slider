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



import styled from "styled-components"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import ArrowBackSVG from "../../../public/icons/ArrowBack"
import ArrowForwardSVG from "../../../public/icons/ArrowForward"
import { ButtonSlider } from "../../common/components/ButtonSlider/ButtonSlider"
import { PartData } from "../../common/components/PartData/PartData"
import { Card } from "../../common/components/Card/Card"

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

export function TimelineSlider() {
    const data = [1, 2, 3]
    const showSliderButtons = data.length > 1

    return (
        <ContainerSlider>
            <Counter>
                <Parts>
                    <PartData data={"01"} />
                    /<PartData data={"06"} />
                </Parts>
                {showSliderButtons && (
                    <ButtonsContainer>
                        <ButtonSlider>
                            <ArrowBackSVG />
                        </ButtonSlider>
                        <ButtonSlider>
                            <ArrowForwardSVG />
                        </ButtonSlider>
                    </ButtonsContainer>
                )}
            </Counter>

            <TimelineContainer>
                {showSliderButtons && (
                    <ButtonSlider>
                        <ArrowBackSVG />
                    </ButtonSlider>
                )}
                {data.map((d, index) => (
                    <Card key={index} title={"1997"} description={"kfndnvndfnlknlsklfvnf   skmdkfmpsdmp lsdmpfppdsk"} />
                ))}
                {showSliderButtons && (
                    <ButtonSlider>
                        <ArrowForwardSVG />
                    </ButtonSlider>
                )}
            </TimelineContainer>
        </ContainerSlider>
    )
}

