import styled, { css, keyframes } from 'styled-components'

interface StyledContainerProps {
  urlImg?: string;
  isScreenBigger?: boolean;
}

const fadeIn = keyframes`
  0% { transform: scale(1) }
  100% { transform: scale(1.03) }
`

export const StyledContainer = styled.section<StyledContainerProps>`
  width: 100%;
  height: 100vh;

  background: #272727;

  ${(props) => props.urlImg ? css`
    background-image: url('${props.urlImg}');
    background-size: cover;
    background-position-x: 50%;
    background-position-y: center;
  ` : ''}

  display: flex;
  flex-direction: column;

  .bodyContainer {
    flex: 1;
    display: flex;

    .bodyContent {
      flex: 1;
      display: flex;
      align-self: center;
      padding-left: 12.5%;
    }
  }
  
  @media (max-width: 770px) {

    ${(props) => props.isScreenBigger ? css`
      height: 100%;
      ` : ''
    }

    .bodyContainer {
      .bodyContent {
        padding-left: 1rem;
      }
    }
  }
`