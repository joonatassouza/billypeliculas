import styled, { css, keyframes } from 'styled-components'

const slideIn = keyframes`
  0% { transform: scaleX(0);}
  100% { transform: scaleX(1);}
`

const slideOut = keyframes`
  0% { transform: scaleX(1);}
  100% { transform: scaleX(0);}
`

export const StyledNavigation = styled.nav`
  width: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #FFF;

  .nav-pages {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    a {
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 100%;

      transition: background 0.3s;

      &:hover {
        background: #ff7500;
      }
    }
  }  

.activePage {
  background: #ff7500;
  color:  #ff7500;
}

.inactivePage {  
  background: #FFF;
}

.page-up, .page-down {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background: none;
    border: none;
  }

  svg {
    width: 2rem;
    height: 1.8rem;
    fill: #FFF;

    transition: fill 0.3s;

    &:hover{
      fill: #ff7500;
    }
  }
}

.page-up {
  margin-bottom: 3rem;
}

.page-down {
  margin-top: 3rem;
}

@media (max-width: 770px) {
  display: none;
}
`

interface SidebarProps {
  sidebarDrawer?: boolean;
}

export const Sidebar = styled.div<SidebarProps>`

  ${({ sidebarDrawer }) => sidebarDrawer === undefined ? '' : css`  
    animation: ${sidebarDrawer 
      ? css`${slideIn} 300ms linear forwards`
      : css`${slideOut} 300ms linear forwards`};

      transform-origin: 100% 50%;
  `}


  position: absolute;
  background: #272727;

  transform: scaleX(0);

  height: 100%;
  top: 0;
  right: 0;
  width: 34rem;

  padding: 0 3.6rem 0 5.3rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .sidebar-pages {
    display: flex;
    flex-direction: column;
    gap: 4rem;

    a {
    width: 0;
    height: 0;

    span {
      font-size: 2.2rem;
      font-weight: 600;
      color: #6F6F6F;

      transition: color 0.3s;

      &:hover {
        color: #FFF;
      }
    }
  }
  }

  overflow-y: scroll;

  &::-webkit-scrollbar {
    background: #212121;
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff7500;
    border-radius: 10px;
    cursor: pointer;
  }

  .button-x {
    display: none;

    button {
      background: none;
      border: none;

      img {
        width: 2.2rem;
      }
    }
  }

  .page-down-button, .page-up-button {
    display: none;
  }

  .button-x {
    display: flex;
    justify-content: flex-end;
    padding-top: 1.8rem;

    width: 100%;
  }

  .nav-footer {
    display: block;
    font-size: 0.9rem;
    padding-bottom: 5rem;
    color: #FFF;
  }

@media (max-width: 770px) {
  width: 100%;
}
`