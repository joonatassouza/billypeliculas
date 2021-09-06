import Router, { useRouter } from 'next/dist/client/router';
import { useEffect, useMemo } from 'react';
import { StyledNavigation, Sidebar } from './styles'

import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import Link from 'next/link'
import Image from 'next/image';

export function Navigation() {
  const { route } = useRouter();
  const { sidebarDrawer, toggleSidebarDrawer } = useSidebarDrawer();

  const pageSelected = useMemo(() => {
    const [, selected] = route.split('/')

    return selected
  }, [route])

  useEffect(() => {
    if (pageSelected !== undefined && sidebarDrawer) {
      toggleSidebarDrawer()
    }
  }, [pageSelected])


  function handlePageChangeDown() {
    switch (pageSelected) {
      case '':
        Router.push('/sobre')
        break;
      case 'sobre':
        Router.push('/servicos')
        break;
      case 'servicos':
        Router.push('/parceiros')
        break;
      case 'parceiros':
        Router.push('/depoimentos')
        break;
      case 'depoimentos':
        Router.push('/contatos')
        break;
    
      default:
        break;
    }
  }
  
  function handlePageChangeUp() {
    switch (pageSelected) {
      case 'contatos':
        Router.push('/depoimentos')
        break;
      case 'depoimentos':
        Router.push('/parceiros')
        break;
      case 'parceiros':
        Router.push('/servicos')
        break;
      case 'servicos':
        Router.push('/sobre')
        break;
      case 'sobre':
        Router.push('/')
        break;
    
      default:
        break;
    }
  }
  return (
    <>
      <StyledNavigation>
        <div className="page-up">
          <button className="page-up-button" onClick={handlePageChangeUp}>
            <svg width="117" height="63" viewBox="0 0 117 63" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.18777 60.9C2.78777 62.5 5.38777 62.5 6.98777 60.9L57.9878 9.80001L109.088 60.9C110.688 62.5 113.288 62.5 114.888 60.9C116.488 59.3 116.488 56.7 114.888 55.1L60.9878 1.2C60.1878 0.400001 59.1878 3.8147e-06 58.0878 3.8147e-06C57.0878 3.8147e-06 55.9878 0.400001 55.1878 1.2L1.28777 55.1C-0.412227 56.7 -0.412233 59.3 1.18777 60.9V60.9Z"/>
            </svg>
          </button>
        </div>
        <div className="nav-pages">
          <Link href="/">
            <a
              className={`${pageSelected === '' ? 'activePage' : 'inactivePage'}`}
            >
            </a>
          </Link>
          <Link href="/sobre">
            <a 
              className={`${pageSelected === 'sobre' ? 'activePage' : 'inactivePage'}`}
            >
            </a>
          </Link>
          <Link href="/servicos">
            <a
              className={`${pageSelected === 'servicos' ? 'activePage' : 'inactivePage'}`}
            >
            </a>
          </Link>
          <Link href="/parceiros">
            <a
              className={`${pageSelected === 'parceiros' ? 'activePage' : 'inactivePage'}`}
            >
            </a>
          </Link>
          <Link href="/depoimentos">
            <a
              className={`${pageSelected === 'depoimentos' ? 'activePage' : 'inactivePage'}`}
            >
            </a>
          </Link>
          <Link href="/contatos">
            <a
              className={`${pageSelected === 'contatos' ? 'activePage' : 'inactivePage'}`}
            >
            </a>
          </Link>
        </div>
        <div className="page-down">
          <button className="page-down-button" onClick={handlePageChangeDown}>
            <svg width="117" height="63" viewBox="0 0 117 63" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M114.9 1.2C113.3 -0.4 110.7 -0.4 109.1 1.2L58.1 52.3L7 1.2C5.4 -0.4 2.8 -0.4 1.2 1.2C-0.4 2.8 -0.4 5.4 1.2 7L55.1 60.9C55.9 61.7 56.9 62.1 58 62.1C59 62.1 60.1 61.7 60.9 60.9L114.8 7C116.5 5.4 116.5 2.8 114.9 1.2V1.2Z"/>
            </svg>
          </button>
        </div>
      </StyledNavigation>
      <Sidebar sidebarDrawer={sidebarDrawer}>
      <div className="button-x">
        <button 
          onClick={() => toggleSidebarDrawer()}  
        >
          <Image src="/letra-x.svg" alt="" width={1} height={1} />
        </button>
      </div>
        <div className="sidebar-pages">
          <Link href="/">
            <a>
              <span>Início</span>
            </a>
          </Link>
          <Link href="/sobre">
            <a>
              <span>Sobre</span>
            </a>
          </Link>
          <Link href="/servicos">
            <a>
              <span>Serviços</span>
            </a>
          </Link>
          <Link href="/parceiros">
            <a>
              <span>Parceiros</span>
            </a>
          </Link>
          <Link href="/depoimentos">
            <a>
              <span>Depoimentos</span>
            </a>
          </Link>
          <Link href="/contatos">
            <a>
              <span>Contatos</span>
            </a>
          </Link>
        </div>
        <div className="nav-footer">
          <p>&copy; Billy Películas 2021. Todos os direitos reservados</p>
          <p>Design by Jonatas Souza</p>
        </div>
      </Sidebar>
    </>
  )
}