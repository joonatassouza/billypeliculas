import { useRouter } from 'next/dist/client/router'
import { useMemo } from 'react'
import styles from './styles.module.scss'


export function PageTitle() {
  const { route } = useRouter();

  const pageSelected = useMemo(() => {
    const [, selected] = route.split('/')

    return selected
  }, [route])

  return (
    <div className={styles.title}>
      {pageSelected === '' && (
        <span>Início</span>
      )}
      {pageSelected === 'sobre' && (
        <span>Quem somos</span>
      )}
      {pageSelected === 'servicos' && (
        <span>Nossos serviços</span>
      )}
      {pageSelected === 'parceiros' && (
        <span>Parcerias</span>
      )}
      {pageSelected === 'depoimentos' && (
        <span>Depoimentos</span>
      )}
    </div>
  )
}