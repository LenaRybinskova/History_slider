import React from "react"
import styled from "styled-components"
import { colors } from 'styles/stylesVar'

type CircleButtonProps = React.ComponentPropsWithoutRef<'button'> & {
    withBackground?: boolean
    children: React.ReactNode
}

const Button = styled.button<{ $withBackground?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid ${colors.text || "#e5e7eb"};
  background: ${(props) => (props.$withBackground ? "#fff" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$withBackground ? "#f9f9f9" : "#f5f5f5")};
  }

  &:disabled {
    cursor: not-allowed;
  }
`

export const ButtonSlider = React.forwardRef<HTMLButtonElement, CircleButtonProps>(
    ({ onClick, disabled = false, withBackground = false, children, className, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                onClick={onClick}
                disabled={disabled}
                $withBackground={withBackground}
                className={className}
                {...props}
            >
                {children}
            </Button>
        )
    }
)

ButtonSlider.displayName = 'ButtonSlider'
