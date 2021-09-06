import { ReactNode, useEffect, useState } from 'react'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { PageTitle } from '../PageTitle'
import { Navigation } from '../Navigation'

import { StyledContainer } from './styles'

interface ContainerProps {
  children: ReactNode;
  urlImg?: string;
  contact?: string;
  isScreenBigger?: boolean;
  headerTitle: string;
}

export function Container({ children, urlImg, isScreenBigger=false, headerTitle }: ContainerProps) {

  return (
    <StyledContainer urlImg={urlImg} isScreenBigger={isScreenBigger}>
      <Header title={headerTitle} />
      <div className="bodyContainer">
        <PageTitle />
        <section className="bodyContent">
          {children}
        </section>
        <Navigation /> 
      </div>
      <Footer />    
    </StyledContainer>
  )
}