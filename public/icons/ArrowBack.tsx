import { Ref, SVGProps, forwardRef, memo } from 'react';
import  React from 'react'

const ArrowBackSVG = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" stroke-width="2"/>
    </svg>


    /*<svg
        fill={'none'}
        height={'1em'}
        ref={ref}
        viewBox={'0 0 24 24'}
        width={'1em'}
        xmlns={'http://www.w3.org/2000/svg'}
        {...props}
    >
        <g clipPath={'url(#arrow-ios-back-outline_svg__a)'}>
            <path
                d={
                    'M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1.001 1.001 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64'
                }
                fill={'currentColor'}
            />
        </g>
        <defs>
            <clipPath id={'arrow-ios-back-outline_svg__a'}>
                <path d={'M0 0h24v24H0z'} fill={'#fff'} />
            </clipPath>
        </defs>
    </svg>*/
);
const ForwardRef = forwardRef(ArrowBackSVG);
const Memo = memo(ForwardRef);

export default Memo;