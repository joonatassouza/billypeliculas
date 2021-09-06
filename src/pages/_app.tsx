import { AppProps } from 'next/app'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SidebarDrawerProvider>
      <Component {...pageProps} />
    </SidebarDrawerProvider>
  )
}

export default MyApp