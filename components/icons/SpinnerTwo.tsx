import React from 'react'
import styled from 'styled-components'

const StyledSpinnerTwo = styled.i`
  @keyframes spinner-two {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  & {
    transform: scale(var(--ggs, 1));
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 20px;
    height: 20px;
  }
  &::after,
  &::before {
    box-sizing: border-box;
    display: block;
    width: 20px;
    height: 20px;
    content: '';
    position: absolute;
    border-radius: 100px;
  }
  &::before {
    animation: spinner-two 1s cubic-bezier(0.6, 0, 0.4, 1) infinite;
    border: 3px solid transparent;
    border-bottom-color: currentColor;
    border-top-color: currentColor;
  }
  &::after {
    border: 3px solid;
    opacity: 0.2;
  }
`

const icon = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    return (
      <>
        <StyledSpinnerTwo {...props} ref={ref} icon-role="spinner-two" />
      </>
    )
  },
);

icon.displayName = "SpinnerTwo";
export const SpinnerTwo = icon;
