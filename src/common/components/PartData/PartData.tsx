import styled from 'styled-components';
import {colors} from '../../../app/styles/stylesVar';


const Data=styled.span`
    font-size: 14px;
    color: ${colors.text};
    font-weight: 400;
`

export const PartData=({ data }: { data: string })=>{
    const number = parseInt(data, 10);
    const formattedData = !isNaN(number) && number < 10 ? number.toString().padStart(2, '0') : data;

    return (
        <Data>
            {formattedData}
        </Data>
    )
}