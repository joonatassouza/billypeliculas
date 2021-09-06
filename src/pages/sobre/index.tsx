import styles from './styles.module.scss'

import { Container } from "../../components/Container";
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';


import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom';
import { getHeaderTitle } from '../../utils/getHeaderTitle';

import Image from 'next/image'

type Service = {
  serviceId: string;
  serviceName: string;
}

type Content = {
  title: string,
  content: string,
  urlBackground: string,
}

interface ContentProps {
  contentPage: Content
  services: Service[],
  headerTitle: string
}

export default function Sobre({ contentPage, services, headerTitle }: ContentProps) {
  return (
    <Container headerTitle={headerTitle}>
      <section className={styles.content}>
        <div className={styles.textSection}>
          <p>{contentPage.title}</p>
          <h1>
            <span> </span> {contentPage.content[0]}
            <span> </span> {contentPage.content[1]} <br />
            <span>
              <span> </span> {contentPage.content[2]} 
              <span> </span> {contentPage.content[3]}
              <span> </span> {contentPage.content[4]}
            </span>
          </h1>
          <ul className={styles.service}>
            {services.map((service, index) => (
              <li key={service.serviceId}>{index + 1}. {service.serviceName}</li>
            ))}
          </ul>
        </div>
        <div className={styles.imgSection}>
          <Image className={styles.contentImg} src="/bg2-2.jpeg" alt="" width={500} height={500} />
          <div className={styles.timeService}>
            <span>15</span>
            <p>ANOS <br /> DE EXPERIÊNCIA <br /> NO MERCADO</p>
          </div>
        </div>
      </section>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const headerTitle = await getHeaderTitle()

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('texto_da_pagina', 'pagina-quem-somos', {})

  const serviceResponse = await prismic.query(
    Prismic.predicates.at('document.type', 'tipos_de_servico'),
    { orderings: '[my.tipos_de_servico.nome_do_servico]'}
  )

  const contentPage = {
    title:  RichText.asText(response.data.titulo),
    content:  RichText.asText(response.data.texto).split(' '),
    urlBackground: response.data.background.url
  }

  const services = serviceResponse.results.map(service => {
    return {
      serviceId: service.uid,
      serviceName: RichText.asText(service.data.nome_do_servico),
    }
  })

  return {
    props: {
      contentPage,
      services,
      headerTitle
    },
    revalidate: 60 * 60 * 12, //12 hours
  }
}