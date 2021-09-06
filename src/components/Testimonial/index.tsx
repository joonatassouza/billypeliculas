import { ReactNode, useState } from "react"

import styles from './styles.module.scss'

interface TestimoialProps {
  children: ReactNode
}

export function Testimonial({ children }: TestimoialProps) {

  return(
    <div className={styles.testimonial}>
      {children}
    </div>
  )
}