import type React from 'react'
import {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {gsap} from 'gsap'
import {colors} from '../../app/styles/stylesVar'


interface CategoryType {
    id: string;
    description: string;
}

const CircleContainer = styled.div`
    position: absolute;
    width: 536px;
    height: 536px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const CircleRing = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid ${colors.primary};
    border-radius: 50%;
    background: transparent;
`

const PointsContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

const Point = styled.div<{ $isActive: boolean; $isHovered: boolean }>`
    position: absolute;
    width: ${(props) => (props.$isActive || props.$isHovered ? '56px' : '6px')};
    height: ${(props) => (props.$isActive || props.$isHovered ? '56px' : '6px')};
    background-color: ${(props) => (props.$isActive ? colors.background : '#42567a')};
    border: ${(props) => props.$isActive ? `2px solid ${colors.text}` : 'none'};
    border-radius: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
    z-index: 10;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    color: white;

    &:hover {
        background-color: ${colors.background};
        border: 2px solid ${colors.text};
    }
`

const PointNumber = styled.span<{ $visible: boolean; $rotation: number }>`
    opacity: ${(props) => (props.$visible ? 1 : 0)};
    transition: opacity 0.3s ease;
    user-select: none;
    transform: rotate(${(props) => props.$rotation}deg);
    position: absolute;
`

const PointTitle = styled.span<{ $visible: boolean; $rotation: number }>`
    position: absolute;
    top: 46px;
    left: -44px;
    transform: rotate(${props => props.$rotation}deg);
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
    opacity: ${props => props.$visible ? 1 : 0};
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 20;

    &::after {
        right: 10px;
        left: auto;
    }
`

interface AnimatedCircleProps {
    categories: CategoryType[];
    onPointClick?: (index: number, categoryId: string) => void;
    onActiveCategoryChange?: (categoryId: string) => void;
    activePointIndex: number;
}

export const AnimatedCircle: React.FC<AnimatedCircleProps> = ({
                                                                  categories,
                                                                  activePointIndex,
                                                                  onPointClick,
                                                                  onActiveCategoryChange
                                                              }) => {
    const pointsCount = categories.length;
    const containerRef = useRef<HTMLDivElement>(null)
    const pointsContainerRef = useRef<HTMLDivElement>(null)
    const pointsRef = useRef<HTMLDivElement[]>([])
    const numbersRef = useRef<HTMLSpanElement[]>([])
    const titlesRef = useRef<HTMLSpanElement[]>([])
    const [internalActiveIndex, setInternalActiveIndex] = useState(activePointIndex)
    const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null)
    const [containerRotation, setContainerRotation] = useState(0)

    console.log('categories2222', categories)
    const validPointsCount = Math.max(2, Math.min(6, pointsCount))

    useEffect(() => {
        if (activePointIndex !== internalActiveIndex) {
            setInternalActiveIndex(activePointIndex);
            animateToActivePosition(activePointIndex);
        }
    }, [activePointIndex]);

    const getPointPosition = (index: number, total: number) => {
        const radius = 268
        const step = 360 / total
        const angle = index * step - 310
        const radian = (angle * Math.PI) / 180

        const x = radius + radius * Math.cos(radian)
        const y = radius + radius * Math.sin(radian)

        return {x, y, angle}
    }

    const getShortestRotation = (currentIndex: number, targetIndex: number, total: number) => {
        const angleStep = 360 / total
        const currentAngle = currentIndex * angleStep
        const targetAngle = targetIndex * angleStep

        let angleDiff = targetAngle - currentAngle

        if (angleDiff > 180) {
            angleDiff -= 360
        } else if (angleDiff < -180) {
            angleDiff += 360
        }

        return angleDiff
    }

    const animateToActivePosition = (targetIndex: number) => {
        if (targetIndex === internalActiveIndex || !pointsContainerRef.current) return

        const currentRotation = gsap.getProperty(pointsContainerRef.current, 'rotation') as number
        const shortestRotation = getShortestRotation(internalActiveIndex, targetIndex, validPointsCount)
        const targetRotation = currentRotation - shortestRotation

        gsap.to(pointsContainerRef.current, {
            rotation: targetRotation,
            duration: 1.2,
            ease: 'power2.inOut',
            onUpdate: () => {
                const currentRot = gsap.getProperty(pointsContainerRef.current, 'rotation') as number
                numbersRef.current.forEach((numberEl) => {
                    if (numberEl) {
                        gsap.set(numberEl, {
                            rotation: -currentRot,
                            immediateRender: true,
                        })
                    }
                });
                titlesRef.current.forEach((titleEl) => {
                    if (titleEl) {
                        gsap.set(titleEl, {
                            rotation: -currentRot,
                            immediateRender: true,
                        })
                    }
                });
            },
            onComplete: () => {
                setContainerRotation(targetRotation)
                setInternalActiveIndex(targetIndex)
                if (categories[targetIndex]) {
                    onPointClick?.(targetIndex, categories[targetIndex].id)
                    onActiveCategoryChange?.(categories[targetIndex].id)
                }
            },
        })
    }

    useEffect(() => {
        if (!containerRef.current) return

        pointsRef.current.forEach((point, index) => {
            if (!point) return

            const {x, y} = getPointPosition(index, validPointsCount)

            gsap.set(point, {
                left: x,
                top: y,
            })
        })

        const initialRotation = -150;
        if (pointsContainerRef.current) {
            gsap.set(pointsContainerRef.current, {
                rotation: initialRotation,
                immediateRender: true,
            })
            setContainerRotation(initialRotation)

            numbersRef.current.forEach((numberEl) => {
                if (numberEl) {
                    gsap.set(numberEl, {
                        rotation: -initialRotation,
                        immediateRender: true,
                    })
                }
            })

            titlesRef.current.forEach((titleEl) => {
                if (titleEl) {
                    gsap.set(titleEl, {
                        rotation: -initialRotation,
                        immediateRender: true,
                    })
                }
            })
        }
    }, [validPointsCount])

    const handlePointClick = (index: number) => {
        if (onPointClick) {
            onPointClick(index, categories[index].id);
        }
    }

    const handlePointMouseEnter = (index: number) => {
        setHoveredPointIndex(index)
    }

    const handlePointMouseLeave = () => {
        setHoveredPointIndex(null)
    }

    return (
        <CircleContainer ref={containerRef}>
            <CircleRing/>
            <PointsContainer ref={pointsContainerRef}>
                {categories.slice(0, validPointsCount).map((category, index) => (
                    <Point
                        key={category.id}
                        ref={(el) => {
                            if (el) pointsRef.current[index] = el
                        }}
                        $isActive={index === activePointIndex}
                        $isHovered={hoveredPointIndex === index}
                        onClick={() => handlePointClick(index)}
                        onMouseEnter={() => handlePointMouseEnter(index)}
                        onMouseLeave={handlePointMouseLeave}
                    >
                        <PointNumber
                            ref={(el) => {
                                if (el) numbersRef.current[index] = el
                            }}
                            $visible={index === activePointIndex || hoveredPointIndex === index}
                            $rotation={-containerRotation}
                        >
                            {index + 1}
                        </PointNumber>

                        <PointTitle
                            ref={(el) => {
                                if (el) titlesRef.current[index] = el
                            }}
                            $visible={index === activePointIndex}
                            $rotation={-containerRotation}
                        >
                            {category.description}
                        </PointTitle>
                    </Point>
                ))}
            </PointsContainer>
        </CircleContainer>
    )
}
