import styled from 'styled-components';
import {colors} from '../../../app/stylesVar';

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const Title = styled.h3`
    font-weight: 400;
    font-size: 25px;
    line-height: 120%;
    text-transform: uppercase;
    color:${colors.lightBlue}
`

const Description = styled.p`
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;`

type Props = {
    title: string,
    description: string,
}

export const Card = (props: Props) => {
    const {title, description} = props
    return (
        <CardContainer>
            <Title>{title}</Title>
            <Description>{description}</Description>
        </CardContainer>
    )
}