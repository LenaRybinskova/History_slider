import styled from 'styled-components';
import {colors} from 'styles/stylesVar';
import {gsap} from 'gsap';
import {useEffect, useRef, useState} from 'react';

export const TimePeriodContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 125px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
`;

export const Date = styled.div<{ $secondary?: boolean }>`
    font-weight: 700;
    font-size: 200px;
    line-height: 80%;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${props => props.$secondary ? colors.secondary : colors.primary};
`;

type Props = {
    period: number[]
}

export const TimePeriod = ({period}: Props) => {
    const [displayedPeriod, setDisplayedPeriod] = useState<number[]>([]);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const previousPeriod = useRef<number[]>([]);

    useEffect(() => {
        if (period.length === 0) {
            setDisplayedPeriod([]);
            previousPeriod.current = [];
            return;
        }

        if (previousPeriod.current.length === 0) {
            setDisplayedPeriod(period);
            previousPeriod.current = period;
            return;
        }

        if (animationRef.current) {
            animationRef.current.kill();
        }

        const animationValues = {
            start: previousPeriod.current[0] || 0,
            end: previousPeriod.current[1] || 0
        };

        animationRef.current = gsap.to(animationValues, {
            start: period[0],
            end: period[1],
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
                setDisplayedPeriod([
                    Math.round(animationValues.start),
                    Math.round(animationValues.end)
                ]);
            },
            onComplete: () => {
                setDisplayedPeriod(period);
                previousPeriod.current = period;
            }
        });

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [period]);

    if (displayedPeriod.length === 0) {
        return null;
    }

    return (
        <TimePeriodContainer>
            <Date>
                {displayedPeriod[0]?.toString()}
            </Date>
            <Date $secondary>
                {displayedPeriod[1]?.toString()}
            </Date>
        </TimePeriodContainer>
    );
};