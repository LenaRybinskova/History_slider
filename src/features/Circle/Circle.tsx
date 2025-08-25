import type React from "react"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { gsap } from "gsap"
import { colors } from "../../app/stylesVar"

interface AnimatedCircleProps {
    pointsCount: number
    onPointClick?: (index: number) => void
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
  width: ${(props) => (props.$isActive || props.$isHovered ? "56px" : "6px")};
  height: ${(props) => (props.$isActive || props.$isHovered ? "56px" : "6px")};
  background-color: ${(props) => (props.$isActive ? "#5d5fef" : "#42567a")};
  border: 2px solid white;
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
    background-color: #ef5da8;
  }
`

const PointNumber = styled.span<{ $visible: boolean }>`
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  user-select: none;
`

export const AnimatedCircle: React.FC<AnimatedCircleProps> = ({ pointsCount = 4, onPointClick }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const pointsContainerRef = useRef<HTMLDivElement>(null)
    const pointsRef = useRef<HTMLDivElement[]>([])
    const [activePointIndex, setActivePointIndex] = useState(0)
    const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null)

    const validPointsCount = Math.max(2, Math.min(6, pointsCount))

    const getPointPosition = (index: number, total: number) => {
        const radius = 268
        const startAngle = -60
        const angleStep = 360 / total
        const angle = startAngle + index * angleStep
        const radian = (angle * Math.PI) / 180

        const x = radius + radius * Math.cos(radian)
        const y = radius + radius * Math.sin(radian)

        return { x, y, angle }
    }

    const animateToActivePosition = (clickedIndex: number) => {
        if (clickedIndex === activePointIndex || !pointsContainerRef.current) return

        const angleStep = 360 / validPointsCount
        const rotationAngle = -clickedIndex * angleStep

        gsap.to(pointsContainerRef.current, {
            rotation: rotationAngle,
            duration: 1.2,
            ease: "power2.inOut",
        })

        setActivePointIndex(clickedIndex)
    }

    useEffect(() => {
        if (!containerRef.current) return

        pointsRef.current.forEach((point, index) => {
            if (!point) return

            const { x, y } = getPointPosition(index, validPointsCount)

            gsap.set(point, {
                left: x,
                top: y,
            })
        })

        if (pointsContainerRef.current) {
            gsap.set(pointsContainerRef.current, { rotation: 0 })
            setActivePointIndex(0)
        }
    }, [validPointsCount])

    const handlePointClick = (index: number) => {
        animateToActivePosition(index)
        onPointClick?.(index)
    }

    const handlePointMouseEnter = (index: number) => {
        setHoveredPointIndex(index)
    }

    const handlePointMouseLeave = () => {
        setHoveredPointIndex(null)
    }

    return (
        <CircleContainer ref={containerRef}>
            <CircleRing />
            <PointsContainer ref={pointsContainerRef}>
                {Array.from({ length: validPointsCount }, (_, index) => (
                    <Point
                        key={index}
                        ref={(el) => {
                            if (el) pointsRef.current[index] = el
                        }}
                        $isActive={index === activePointIndex}
                        $isHovered={hoveredPointIndex === index}
                        onClick={() => handlePointClick(index)}
                        onMouseEnter={() => handlePointMouseEnter(index)}
                        onMouseLeave={handlePointMouseLeave}
                    >
                        <PointNumber $visible={index === activePointIndex || hoveredPointIndex === index}>{index + 1}</PointNumber>
                    </Point>
                ))}
            </PointsContainer>
        </CircleContainer>
    )
}
