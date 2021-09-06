
import styles from './styles.module.scss'

import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import Link from 'next/link'
import Image from 'next/image';

type HeaderProps = {
  title: string
}

export function Header({ title }: HeaderProps) {

  const { toggleSidebarDrawer } = useSidebarDrawer();

  return (
    <section className={styles.header}>
      <div className={styles.logo}>
        <div>                  
          <Link href="/">
            <Image src="/brand-white.png" alt="logo" width={1} height={1} />
          </Link>
          <div className={styles.nameLogo}>
            <span className={styles.brandName}>BILLY</span>
            <span className={styles.brandText}>PELÍCULAS</span>
          </div>
        </div>        
        <p className={styles.contact}>{title}</p>        
      </div>
      <button
        onClick={toggleSidebarDrawer}
      >
        <Image src="/menu-icon.svg" alt="abrir menu lateral" width={1} height={1} />
      </button>      
    </section>
  )
}