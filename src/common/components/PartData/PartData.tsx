import styled from 'styled-components';
import {colors} from '../../../app/stylesVar';


const Data=styled.span`
    font-size: 14px;
    color: ${colors.text};
    font-weight: 400;
`

//TODO типизацию изменить
export const PartData=(data:any)=>{
    return (
        <Data>
            {data.toString()}
        </Data>
    )
}